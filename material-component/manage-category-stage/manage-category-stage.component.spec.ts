import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryStageComponent } from './manage-category-stage.component';

describe('ManageCategoryStageComponent', () => {
  let component: ManageCategoryStageComponent;
  let fixture: ComponentFixture<ManageCategoryStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoryStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
