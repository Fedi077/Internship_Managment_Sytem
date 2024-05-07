import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedInternshipsComponent } from './affected-internships.component';

describe('AffectedInternshipsComponent', () => {
  let component: AffectedInternshipsComponent;
  let fixture: ComponentFixture<AffectedInternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectedInternshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectedInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
