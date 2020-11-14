import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  openSideBar: boolean;
  
  get isUtenteLogged(): boolean{
    return this.ds.utente !== undefined && this.ds.utente !== null;
  }

  constructor(private ds: DelegateServiceService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.openSideBar = next
    })
    
  }

  ngOnInit(): void {
    
  }

}
