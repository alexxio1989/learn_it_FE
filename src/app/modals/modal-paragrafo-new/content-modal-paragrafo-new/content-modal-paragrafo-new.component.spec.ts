import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalParagrafoNewComponent } from './content-modal-paragrafo-new.component';

describe('ContentModalParagrafoNewComponent', () => {
  let component: ContentModalParagrafoNewComponent;
  let fixture: ComponentFixture<ContentModalParagrafoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentModalParagrafoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalParagrafoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
