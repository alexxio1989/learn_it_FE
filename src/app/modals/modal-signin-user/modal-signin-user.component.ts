import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-modal-signin-user',
  templateUrl: './modal-signin-user.component.html',
  styleUrls: ['./modal-signin-user.component.css']
})
export class ModalSigninUserComponent implements OnInit {

  user: User = new User();

  constructor(private modalService: NgbModal ,private ds: DelegateServiceService , private us: UtenteServiceService) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.us.getOBSSignIn(this.user).subscribe(next =>{
        this.ds.updateResultService('Registrazione utente Avvenuta con successo');
        this.ds.updateSpinner(false);
      },error => {
        this.ds.updateResultService('Registrazione utente in errore');
        this.ds.updateSpinner(false);
      });
    });
  }

}
