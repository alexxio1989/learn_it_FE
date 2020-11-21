import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalParagrafoEditComponent } from './content-modal-paragrafo-edit.component';

describe('ContentModalParagrafoEditComponent', () => {
  let component: ContentModalParagrafoEditComponent;
  let fixture: ComponentFixture<ContentModalParagrafoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalParagrafoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalParagrafoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
