import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselReadedComponent } from './carousel-readed.component';

describe('CarouselReadedComponent', () => {
  let component: CarouselReadedComponent;
  let fixture: ComponentFixture<CarouselReadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselReadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselReadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
