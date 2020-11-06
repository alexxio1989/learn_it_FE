import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLezioneComponent } from './card-lezione.component';

describe('CardLezioneComponent', () => {
  let component: CardLezioneComponent;
  let fixture: ComponentFixture<CardLezioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLezioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
