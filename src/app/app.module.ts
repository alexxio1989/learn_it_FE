import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ImageCorsoComponent } from './varie/image-corso/image-corso.component';
import { NavBarComponent } from './navs/nav-bar/nav-bar.component';
import { SideBarComponent } from './navs/side-bar/side-bar.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModalSigninUserComponent } from './modals/modal-signin-user/modal-signin-user.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselComponent } from './carousel/carousel.component';
import { SpinnerComponent } from './varie/spinner/spinner.component';
import { ContentModalLoginComponent } from './modals/modal-login-user/content-modal-login/content-modal-login.component';
import { ContentModalCorsoComponent } from './modals/modal-corso/content-modal-corso/content-modal-corso.component';
import { ContentModalCorsoEditComponent } from './modals/modal-corso-edit/content-modal-corso-edit/content-modal-corso-edit.component';
import { ContentModalParagrafoNewComponent } from './modals/modal-paragrafo-new/content-modal-paragrafo-new/content-modal-paragrafo-new.component';
import { ContentModalParagrafoEditComponent } from './modals/modal-paragrafo-edit/content-modal-paragrafo-edit/content-modal-paragrafo-edit.component';
import { ContentModalSigninComponent } from './modals/modal-signin-user/content-modal-signin/content-modal-signin.component'
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ModalInfoCorsoComponent } from './modals/modal-info-corso/modal-info-corso.component';
import { ContentModalInfoCorsoComponent } from './modals/modal-info-corso/content-modal-info-corso/content-modal-info-corso.component';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PageUtenteComponent } from './pages/page-utente/page-utente.component';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { NgxStripeModule } from 'ngx-stripe';
import { PagamentiServiceService } from './services/pagamenti-service.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ServiceCore } from './services/core/ServiceCore';
import { FormatTextPipe } from './pipes/format-text.pipe';



const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: ServiceCore.baseURl 
  },
  position: "bottom",
  theme: "classic",
  palette: {
    popup: {
      background: "#000000",
      text: "#ffffff",
      link: "#ffffff"
    },
    button: {
      background: "#f1d600",
      text: "#000000",
      border: "transparent"
    }
  },
  type: "info",
  content: {
    message: "This website uses cookies to ensure you get the best experience on our website.",
    dismiss: "Got it!",
    deny: "Decline",
    link: "Learn more",
    href: "https://cookiesandyou.com",
    policy: "Cookie Policy",
    header: "Cookies used on the website!",
    allow: "Allow cookies"
  }
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

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
    ModalSigninUserComponent,
    CarouselComponent,
    ContentModalLoginComponent,
    ContentModalCorsoComponent,
    ContentModalCorsoEditComponent,
    ContentModalParagrafoNewComponent,
    ContentModalParagrafoEditComponent,
    ContentModalSigninComponent,
    ModalInfoCorsoComponent,
    ContentModalInfoCorsoComponent,
    PageUtenteComponent,
    FormatTextPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxStripeModule.forRoot("pk_live_rpWi9WRKeaD703jtVD9eKS0Q00Ai6Pbw6Y"),
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
    MatExpansionModule,
    SwiperModule,
    BrowserModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatStepperModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatRippleModule,
    CodemirrorModule,
    NgcCookieConsentModule.forRoot(cookieConfig),

  ],
  providers: [
    CorsoServiceService,
    LezioneServiceService,
    ParagrafoServiceService,
    DelegateServiceService,
    PagamentiServiceService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
