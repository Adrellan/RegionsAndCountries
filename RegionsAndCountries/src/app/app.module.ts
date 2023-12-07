import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialModule } from 'material.module';

import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { CountryComponent } from './page/country/country.component';
import { RegioComponent } from './page/regio/regio.component';
import { NavbarComponent } from './part/navbar/navbar.component';
import { TableControlsComponent } from './part/table-controls/table-controls.component';
import { CountryEditComponent } from './page/country/country-edit/country-edit.component';
import { RegioEditComponent } from './page/regio/regio-edit/regio-edit.component';
import { ConfirmDialogComponent } from './part/confirm-dialog/confirm-dialog.component';

const appRouting: Routes = [
  {path: '', component: CountryComponent},
  {path: 'country', component: CountryComponent},
  {path: 'region', component: RegioComponent},
  {path: '**', component: CountryComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegioComponent,
    NavbarComponent,
    TableControlsComponent,
    CountryEditComponent,
    RegioEditComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRouting),
    HttpClientModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
