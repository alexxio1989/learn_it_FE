import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarsModule } from 'ngx-stars';
import { CardFeedbackComponent } from './cards/card-feedback/card-feedback.component';
import { CardLezioneComponent } from './cards/card-lezione/card-lezione.component';
import { CardCorsoComponent } from './cards/card-corso/card-corso.component';
import { ModalCorsoComponent } from './modals/modal-corso/modal-corso.component';
import { PageCorsoComponent } from './pages/page-corso/page-corso.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLezioneComponent } from './pages/page-lezione/page-lezione.component';
import { ModalCorsoEditComponent } from './modals/modal-corso-edit/modal-corso-edit.component';
import { ModalParagrafoEditComponent } from './modals/modal-paragrafo-edit/modal-paragrafo-edit.component';
import { ModalParagrafoNewComponent } from './modals/modal-paragrafo-new/modal-paragrafo-new.component';
import { CorsoServiceService } from './services/corso-service.service';
import { LezioneServiceService } from './services/lezione-service.service';
import { ParagrafoServiceService } from './services/paragrafo-service.service';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { DelegateServiceService } from './services/delegate-service.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ModalLoginUserComponent } from './modals/modal-login-user/modal-login-user.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SpinnerComponent } from './varie/spinner/spinner.component'
import { ImageCorsoComponent } from './varie/image-corso/image-corso.component';
import { NavBarComponent } from './navs/nav-bar/nav-bar.component';
import { SideBarComponent } from './navs/side-bar/side-bar.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModalSigninUserComponent } from './modals/modal-signin-user/modal-signin-user.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

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
    ModalParagrafoNewComponent,
    ModalLoginUserComponent,
    SpinnerComponent,
    ModalSigninUserComponent
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
    NgxStarsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule
  ],
  providers: [
    CorsoServiceService,
    LezioneServiceService,
    ParagrafoServiceService,
    DelegateServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
