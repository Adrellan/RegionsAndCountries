import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';
import { Observable, of, switchMap } from 'rxjs';
import { CountryService } from './service/country.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/part/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryEditComponent } from './country-edit/country-edit.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {

  constructor(
    private countryService: CountryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }
  dataType: string = "Countries"

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

    this.colDefs = this.countryService.TableConfig.map(col => ({ field: col.key, headerName: col.text }));

    this.rowData$ = this.countryService.GetAll().pipe(
      switchMap(data => {
        return this.countryService.MapCtyregidToRegname(data);
      })
    );
  }

  onCellClicked(e: CellClickedEvent): void {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  onRowDoubleClicked(e: RowDoubleClickedEvent): void {
    this.countryService.GetCtyregidByRegname(e.data.Ctyregid).subscribe(ctyregid => {
      const updatedData = { ...e.data, Ctyregid: ctyregid };
      this.countryService.GetCtyregidOptions().subscribe(options => {
        this.openCountryDialog("Edit Country", updatedData, options, true);
      });
    });
  }

  openCountryDialog(title: string, data: any, options: any[], isItUpdate: boolean): void {
    const dialogRef = this.dialog.open(CountryEditComponent, {
      width: '400px',
      disableClose: true,
      data: { title, data, options, isItUpdate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowData$ = this.countryService.GetAll().pipe(
          switchMap(data => {
            return this.countryService.MapCtyregidToRegname(data);
          })
        );
      }
    });
  }

  onAddRowButtonClicked() {
    const newCountryData = {
      Ctyid: '',
      Ctyname: '',
      Ctyregid: 1,
    };
    this.countryService.GetCtyregidOptions().subscribe(options => {
      this.openCountryDialog("Add Country", newCountryData, options, false);
    });
  }

  onEditButtonClicked() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      this.showSnackBar('Nincs kijelölve sor a módosításhoz.');
      return;
    }

    if (selectedRows.length === 1) {
      const countryData = { ...selectedRows[0] };
      this.countryService.GetCtyregidByRegname(countryData.Ctyregid).subscribe(ctyregid => {
        const updatedData = { ...countryData, Ctyregid: ctyregid };
        this.countryService.GetCtyregidOptions().subscribe(options => {
          this.openCountryDialog("Edit Country", updatedData, options, true);
        });
      });
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
        const ctyIds = selectedRows.map(row => row.Ctyid);
  
        this.countryService.Delete(ctyIds).subscribe(
          response => {
            console.log("Sikeres törlés:", response);
            this.rowData$ = this.countryService.GetAll().pipe(
              switchMap(data => {
                return this.countryService.MapCtyregidToRegname(data);
              })
            );
          },
          error => {
            console.error("Hiba történt a törlés során:", error);
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
