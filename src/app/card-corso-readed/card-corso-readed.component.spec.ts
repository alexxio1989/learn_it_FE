import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCorsoReadedComponent } from './card-corso-readed.component';

describe('CardCorsoReadedComponent', () => {
  let component: CardCorsoReadedComponent;
  let fixture: ComponentFixture<CardCorsoReadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCorsoReadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCorsoReadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
