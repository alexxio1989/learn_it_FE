import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCorsoComponent } from './image-corso.component';

describe('ImageCorsoComponent', () => {
  let component: ImageCorsoComponent;
  let fixture: ComponentFixture<ImageCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
