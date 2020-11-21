import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalCorsoComponent } from './content-modal-corso.component';

describe('ContentModalCorsoComponent', () => {
  let component: ContentModalCorsoComponent;
  let fixture: ComponentFixture<ContentModalCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
