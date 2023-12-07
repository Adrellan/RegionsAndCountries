import { Component, OnInit, Inject } from '@angular/core';
import { BaseService } from '../../../service/base.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent {
  title: string;
  countryData: any;
  regionOptions: any[];
  isItUpdate: boolean;
  countryForm: FormGroup;

  constructor(
    private baseService: BaseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CountryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.countryData = { ...data.data };
    this.regionOptions = data.options;
    this.isItUpdate = data.isItUpdate;

    this.countryForm = new FormGroup({
      Ctyid: new FormControl(this.countryData.Ctyid, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
      Ctyname: new FormControl(this.countryData.Ctyname, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      Ctyregid: new FormControl(this.countryData.Ctyregid, [
        Validators.required,
      ]),
    });
  }
  
  onSaveClick() {
    if (this.countryForm.valid) {
      const saveObservable = this.isItUpdate
        ? this.baseService.update("Countries", this.countryForm.value)
        : this.baseService.create("Countries", this.countryForm.value);
  
      saveObservable.subscribe(
        (response) => {
          console.log("Mentés sikeres: " + JSON.stringify(response));
          this.dialogRef.close("A dialógus ablak bezárult.");
        },
        (error) => {
          console.error("Hiba a mentés közben: " + JSON.stringify(error));
  
          if (error.status === 500) {
            const errorResponse = error.error;
  
            if (errorResponse.includes("Violation of PRIMARY KEY constraint")) {
              this.showSnackBar('Ez az országkód már létezik.');
              return;
            }
          }
  
          this.showSnackBar('Hiba történt az adat mentése közben.');
        }
      );
    } else {
      this.showSnackBar('Hiba történt az adat mentése közben.');
    }
  }

  onCancelClick() {
    this.dialogRef.close("A dialógus ablak bezárult.");
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Bezár', {
      duration: 3000,
    });
  }
}
