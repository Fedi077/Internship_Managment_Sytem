import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInfStageComponent } from './manage-inf-stage.component';

describe('ManageInfStageComponent', () => {
  let component: ManageInfStageComponent;
  let fixture: ComponentFixture<ManageInfStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInfStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInfStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
