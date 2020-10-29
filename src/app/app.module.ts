import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorsoComponent } from './corso/corso.component';
import { LezioneComponent } from './lezione/lezione.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LezioneEditComponent } from './lezione-edit/lezione-edit.component'
import { CorsoServiceService } from './corso-service.service';
import { ListaCorsiComponent } from './lista-corsi/lista-corsi.component';
import { ModalCorsoComponent } from './modal-corso/modal-corso.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CorsoComponent,
    LezioneComponent,
    LezioneEditComponent,
    ListaCorsiComponent,
    ModalCorsoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CorsoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
