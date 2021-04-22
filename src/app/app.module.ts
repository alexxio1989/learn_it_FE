import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { PageCorsoComponent } from './pages/page-corso/page-corso.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLezioneComponent } from './pages/page-lezione/page-lezione.component';
import { CorsoServiceService } from './services/corso-service.service';
import { LezioneServiceService } from './services/lezione-service.service';
import { ParagrafoServiceService } from './services/paragrafo-service.service';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { DelegateServiceService } from './services/delegate-service.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ImageCorsoComponent } from './varie/image-corso/image-corso.component';
import { NavBarComponent } from './navs/nav-bar/nav-bar.component';
import { SideBarComponent } from './navs/side-bar/side-bar.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './varie/spinner/spinner.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
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
import { NgxEditorModule } from 'ngx-editor';
import { TextEditorComponent } from './varie/text-editor/text-editor.component';
import { ModalAccessoComponent } from './modals/modal-accesso/modal-accesso.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ModalEditUtenteComponent } from './modals/modal-edit-utente/modal-edit-utente.component';
import { InfoUtenteComponent } from './varie/info-utente/info-utente.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { ModalRichiestaComponent } from './modals/modal-richiesta/modal-richiesta.component';
import { VideoPlayerComponent } from './varie/video-player/video-player.component';
import { EditMenuComponent } from './varie/edit-menu/edit-menu.component';
import { ContentModalInfoCorsoComponent } from './modals/content-modal-info-corso/content-modal-info-corso.component';
import { ContentModalCorsoComponent } from './modals/content-modal-corso/content-modal-corso.component';
import { ContentModalParagrafoNewComponent } from './modals/content-modal-paragrafo-new/content-modal-paragrafo-new.component';
import { ContentModalParagrafoEditComponent } from './modals/content-modal-paragrafo-edit/content-modal-paragrafo-edit.component';
import { ModalCoreComponent } from './modals/core/modal-core/modal-core.component';
import { ModalPagamentoComponent } from './modals/modal-pagamento/modal-pagamento.component';
import { environment } from 'src/environments/environment';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CardUtenteComponent } from './cards/card-utente/card-utente.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CustomMatPaginatorIntl } from './varie/custom-mat-paginator-int';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { CardPageCorsoComponent } from './cards/card-page-corso/card-page-corso.component';
import { CardPageLezioneComponent } from './cards/card-page-lezione/card-page-lezione.component';
import { ModalNewFeedbackComponent } from './modal-new-feedback/modal-new-feedback.component';
import { SezioneTypesComponent } from './pages/page-admin/sezione-types/sezione-types.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SteppersRegistrazioneComponent } from './modals/modal-accesso/steppers-registrazione/steppers-registrazione.component';
import { IntroComponent } from './varie/intro/intro.component';
import { CardCorsoLightComponent } from './cards/card-corso-light/card-corso-light.component';
import { CarouselCardsCorsiComponent } from './varie/carousel-cards-corsi/carousel-cards-corsi.component';
import { NgxSlickJsModule } from 'ngx-slickjs';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareComponent } from './share/share.component';
import { InfoCorsoPipe } from './pipes/info-corso.pipe';
import { FormatTimePipe } from './pipes/FormatTimePipe';
import { InfoCorsoComponent } from './info-corso/info-corso.component';



const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: ServiceCore.baseURl 
  },
  position: "bottom",
  theme: "edgeless",
  palette: {
    popup: {
      background: "#fcfcfc", 
      text: "#000000",
      link: "#000000 "
    },
    button: {
      background: "#f1d600",
      text: "#000000",
      border: "transparent"
    }
  },
  type: "info",
  content: {
    message: "Il mio codice.com fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso.",
    dismiss: "Acconsento",
    deny: "Decline",
    link: "Maggiori info.",
    href: "https://cookiesandyou.com",
    policy: "Cookie Policy",
    header: "Cookies used on the website!",
    allow: "Allow cookies"
  }
}


@NgModule({
  declarations: [
    AppComponent,
    ImageCorsoComponent,
    CardCorsoComponent,
    NavBarComponent,
    CardFeedbackComponent,
    CardLezioneComponent,
    PageCorsoComponent,
    PageHomeComponent,
    PageLezioneComponent,
    SideBarComponent,
    ContentModalParagrafoEditComponent,
    SpinnerComponent,
    ContentModalCorsoComponent,
    ContentModalParagrafoNewComponent,
    ContentModalParagrafoEditComponent,
    ContentModalInfoCorsoComponent,
    PageUtenteComponent,
    FormatTextPipe,
    TextEditorComponent,
    ModalAccessoComponent,
    ModalEditUtenteComponent,
    InfoUtenteComponent,
    PageAdminComponent,
    ModalRichiestaComponent,
    VideoPlayerComponent,
    EditMenuComponent,
    ModalCoreComponent,
    ModalPagamentoComponent,
    CardUtenteComponent,
    TruncateTextPipe,
    CardPageCorsoComponent,
    CardPageLezioneComponent,
    ModalNewFeedbackComponent,
    SezioneTypesComponent,
    SteppersRegistrazioneComponent,
    IntroComponent,
    CardCorsoLightComponent,
    CarouselCardsCorsiComponent,
    ShareComponent,
    InfoCorsoPipe,
    FormatTimePipe,
    InfoCorsoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLIC_TOKEN),
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
    NgxEditorModule,
    MatTabsModule,
    MatSelectCountryModule.forRoot('it'),
    ColorPickerModule,
    MDBBootstrapModule.forRoot(),
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
  }),ShareButtonsModule.withConfig({
    debug: true
  }),
  ShareIconsModule

  ],
  providers: [
    CorsoServiceService,
    LezioneServiceService,
    ParagrafoServiceService,
    DelegateServiceService,
    PagamentiServiceService,
   
    {
      provide: MatPaginatorIntl, 
      useClass: CustomMatPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
