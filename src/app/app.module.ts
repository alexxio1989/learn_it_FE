import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CorsoServiceService } from './corso-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { ImageCorsoComponent } from './image-corso/image-corso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarsModule } from 'ngx-stars';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardFeedbackComponent } from './cards/card-feedback/card-feedback.component';
import { CardLezioneComponent } from './cards/card-lezione/card-lezione.component';
import { CardCorsoComponent } from './cards/card-corso/card-corso.component';
import { ModalCorsoComponent } from './modals/modal-corso/modal-corso.component';
import { PageCorsoComponent } from './pages/page-corso/page-corso.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLezioneComponent } from './pages/page-lezione/page-lezione.component';
import { ModalCorsoEditComponent } from './modals/modal-corso-edit/modal-corso-edit.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ModalParagrafoEditComponent } from './modals/modal-paragrafo-edit/modal-paragrafo-edit.component';
import { ModalParagrafoNewComponent } from './modals/modal-paragrafo-new/modal-paragrafo-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalCorsoComponent,
    ImageCorsoComponent,
    CardCorsoComponent,
    NavBarComponent,
    CardFeedbackComponent,
    CardLezioneComponent,
    PageCorsoComponent,
    PageHomeComponent,
    PageLezioneComponent,
    ModalCorsoEditComponent,
    SideBarComponent,
    ModalParagrafoEditComponent,
    ModalParagrafoNewComponent
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
