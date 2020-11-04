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
import { ImageCorsoComponent } from './image-corso/image-corso.component';
import { CardCorsoComponent } from './card-corso/card-corso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarsModule } from 'ngx-stars';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CorsoComponent,
    LezioneComponent,
    LezioneEditComponent,
    ListaCorsiComponent,
    ModalCorsoComponent,
    ImageCorsoComponent,
    CardCorsoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxStarsModule
  ],
  providers: [CorsoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
