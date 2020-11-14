import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-modal-login-user',
  templateUrl: './modal-login-user.component.html',
  styleUrls: ['./modal-login-user.component.css']
})
export class ModalLoginUserComponent implements OnInit {

  user: User = new User();

  constructor(private modalService: NgbModal ,private ds: DelegateServiceService , private us: UtenteServiceService) { }

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.us.getOBSLogin(this.user).subscribe(next =>{
        this.ds.updateResultService('Login Avvenuto con successo');
        this.ds.updateSpinner(false);
        this.ds.utente = next;
      },error => {
        this.ds.updateResultService('Login in errore');
        this.ds.updateSpinner(false);
      });
    });
  }

}
