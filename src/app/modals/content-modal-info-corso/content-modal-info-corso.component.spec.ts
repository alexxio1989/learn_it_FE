import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalInfoCorsoComponent } from './content-modal-info-corso.component';

describe('ContentModalInfoCorsoComponent', () => {
  let component: ContentModalInfoCorsoComponent;
  let fixture: ComponentFixture<ContentModalInfoCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalInfoCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalInfoCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
