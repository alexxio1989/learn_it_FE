import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppersRegistrazioneComponent } from './steppers-registrazione.component';

describe('SteppersRegistrazioneComponent', () => {
  let component: SteppersRegistrazioneComponent;
  let fixture: ComponentFixture<SteppersRegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppersRegistrazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteppersRegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
