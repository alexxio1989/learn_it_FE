import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLezioneComponent } from './page-lezione.component';

describe('PageLezioneComponent', () => {
  let component: PageLezioneComponent;
  let fixture: ComponentFixture<PageLezioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLezioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
