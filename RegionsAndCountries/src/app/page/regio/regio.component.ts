import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/part/confirm-dialog/confirm-dialog.component';
import { RegioService } from 'src/app/page/regio/service/regio.service';
import { RegioEditComponent } from './regio-edit/regio-edit.component';

@Component({
  selector: 'app-regio',
  templateUrl: './regio.component.html',
  styleUrls: ['./regio.component.css']
})
export class RegioComponent {
  constructor(
    private regioService: RegioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }
  dataType: string = "Regios"

  gridApi!: GridApi;
  agGrid: AgGridAngular;

  rowData$: Observable<any[]>;
  colDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  types: { [key: string]: string } = {};

  onGridReady(api: GridReadyEvent) {
    this.gridApi = api.api;

    this.colDefs = this.regioService.TableConfig.map(col => ({ field: col.key, headerName: col.text }));
    this.rowData$ = this.regioService.GetAll();
  }

  onCellClicked(e: CellClickedEvent): void {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log("E.DATA: " + JSON.stringify(e.data));
  }

  onRowDoubleClicked(e: RowDoubleClickedEvent): void {
    const regioData = { ...e.data };
    this.openRegioDialog("Edit Regio", regioData);
  }

  openRegioDialog(title: string, data: any): void {
    const dialogRef = this.dialog.open(RegioEditComponent, {
      width: '400px',
      disableClose: true,
      data: { title, data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowData$ = this.regioService.GetAll();
      }
    });
  }

  onAddRowButtonClicked() {
    const newRegioData = {
      Regid: 0,
      Regname: '',
    };
    this.openRegioDialog("Add Regio", newRegioData);
  }

  onEditButtonClicked() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      this.showSnackBar('Nincs kijelölve sor a módosításhoz.');
      return;
    }

    if (selectedRows.length === 1) {
      const regioData = { ...selectedRows[0] };
      this.openRegioDialog("Edit Regio", regioData);
    } else {
      console.log("Válasszon ki egy sort a szerkesztéshez!");
    }
  }

  onDeleteButtonClicked() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      this.showSnackBar('Nincs kijelölve sor a törléshez.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Biztosan szeretné törölni a kijelölt sor(oka)t?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        const regIds = selectedRows.map(row => row.Regid);

        this.regioService.Delete(regIds).subscribe(
          response => {
            console.log("Sikeres törlés:", response);
            this.rowData$ = this.regioService.GetAll();
          },
          error => {
            console.error("EZ A HIBA Hiba történt a törlés során:", error);
            if (error.status === 500) {
                this.showSnackBar('Ehhez a régióhoz tartozik ország.');
            }
    
            this.showSnackBar('Hiba történt az adat törlése közben.');
          }
        );
      }
    });
  }

  onClearSelectionClicked() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      this.showSnackBar('Nincs kijelölve sor.');
      return;
    }

    this.gridApi.deselectAll();
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Bezár', {
      duration: 3000,
    });
  }
}
