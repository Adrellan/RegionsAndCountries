import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-table-controls',
  templateUrl: './table-controls.component.html',
  styleUrls: ['./table-controls.component.css']
})
export class TableControlsComponent {
  gridApi: GridApi;
  @Input() dataType: string;
  @Output() addButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() editButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onAddRowButtonClicked() {
    this.addButtonClicked.emit();
  }

  onEditButtonClicked() {
    this.editButtonClicked.emit();
  }
  
  onDeleteButtonClicked() {
    this.deleteButtonClicked.emit();
  }

  onClearSelectionClicked() {
    this.clearButtonClicked.emit();
  }
}