import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtenteComponent } from './page-utente.component';

describe('PageUtenteComponent', () => {
  let component: PageUtenteComponent;
  let fixture: ComponentFixture<PageUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
