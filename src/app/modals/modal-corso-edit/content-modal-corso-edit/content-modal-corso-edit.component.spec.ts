import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalCorsoEditComponent } from './content-modal-corso-edit.component';

describe('ContentModalCorsoEditComponent', () => {
  let component: ContentModalCorsoEditComponent;
  let fixture: ComponentFixture<ContentModalCorsoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalCorsoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalCorsoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
