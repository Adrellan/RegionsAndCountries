import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioComponent } from './regio.component';

describe('RegioComponent', () => {
  let component: RegioComponent;
  let fixture: ComponentFixture<RegioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegioComponent]
    });
    fixture = TestBed.createComponent(RegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
