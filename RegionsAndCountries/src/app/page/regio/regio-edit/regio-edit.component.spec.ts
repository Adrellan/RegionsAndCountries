import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioEditComponent } from './regio-popup.component';

describe('RegioEditComponent', () => {
  let component: RegioEditComponent;
  let fixture: ComponentFixture<RegioEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegioEditComponent]
    });
    fixture = TestBed.createComponent(RegioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
