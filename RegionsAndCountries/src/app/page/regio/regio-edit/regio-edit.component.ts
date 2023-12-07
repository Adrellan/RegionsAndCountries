import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-regio-edit',
  templateUrl: './regio-edit.component.html',
  styleUrls: ['./regio-edit.component.css']
})
export class RegioEditComponent {
  title: string;
  regioData: any;
  regioForm: FormGroup;

  constructor(
    private baseService: BaseService,
    public dialogRef: MatDialogRef<RegioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.regioData = { ...data.data };
    console.log("REGID: " + data.data.Regid);

    this.regioForm = new FormGroup({
      Regid: new FormControl(this.regioData.Regid, [
        Validators.required,
      ]),
      Regname: new FormControl(this.regioData.Regname, [
        Validators.required,
      ]),
    });
  }

  onSaveClick() {
    if (this.data.data.Regid == 0) {
      this.baseService.create("Regios", this.regioForm.value).subscribe(response => {
        console.log("Új adat rögzítve: " + JSON.stringify(response));
      }, error => {
        console.error("Hiba az adat rögzítése közben: " + JSON.stringify(error));
      });
    } else {
      this.baseService.update("Regios", this.regioForm.value).subscribe(response => {
        console.log("Adat frissítve: " + JSON.stringify(response));
      }, error => {
        console.error("Hiba az adat frissítése közben: " + JSON.stringify(error));
      });
    }

    this.onCancelClick();
  }

  onCancelClick() {
    this.dialogRef.close("A dialógus ablak bezárult.");
  }
}
