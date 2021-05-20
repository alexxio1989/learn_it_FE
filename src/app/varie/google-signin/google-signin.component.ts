import { Component, Input, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { User } from '../../model/User';
import { DelegateServiceService } from '../../services/delegate-service.service';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit {

  @Input() isLogin : boolean;

  utente: User = new User();

  constructor(private socialAuthService: SocialAuthService,private ds: DelegateServiceService, private us: UtenteServiceService) { 
    
    
    this.socialAuthService.authState.subscribe((user) => {
     
      this.utente.email = user.email;
      this.utente.nome = user.firstName;
      this.utente.cognome = user.lastName;
      this.utente.password =  user.id;
      this.utente.attivita = '';
      this.us.updateUserGoogle(this.utente);
      },error => {
        
      })
      
   
  }

  ngOnInit(): void {
    
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut(); 
  }

}
