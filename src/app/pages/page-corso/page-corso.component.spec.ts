import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCorsoComponent } from './page-corso.component';

describe('PageCorsoComponent', () => {
  let component: PageCorsoComponent;
  let fixture: ComponentFixture<PageCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
