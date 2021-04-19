import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCorsoComponent } from './info-corso.component';

describe('InfoCorsoComponent', () => {
  let component: InfoCorsoComponent;
  let fixture: ComponentFixture<InfoCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
