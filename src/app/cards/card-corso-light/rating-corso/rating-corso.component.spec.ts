import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCorsoComponent } from './rating-corso.component';

describe('RatingCorsoComponent', () => {
  let component: RatingCorsoComponent;
  let fixture: ComponentFixture<RatingCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
