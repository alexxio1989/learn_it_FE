import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalEditUtenteComponent } from 'src/app/modals/modal-edit-utente/modal-edit-utente.component';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-card-utente',
  templateUrl: './card-utente.component.html',
  styleUrls: ['./card-utente.component.css']
})
export class CardUtenteComponent implements OnInit {

  modalModalEditUtente = ModalEditUtenteComponent;

  @Input() utente: User;
  @Input() isSideBar: boolean;
  @Input() isCardCorso: boolean;
  @Input() isRichiesta: boolean;
  @Input() editInfo: boolean;
  isDevice: boolean;
  confirmDelete: boolean;

  imgCrop = "150px";

  constructor(private route: Router,private ds: DelegateServiceService,private us: UtenteServiceService,private deviceService: DeviceDetectorService) {
    this.us.getOBSUser().subscribe(next => {
      this.utente = next;
      
    })

  }

  ngOnInit(): void {
    this.isDevice = this.deviceService.isMobile();

    if(this.isCardCorso){
      this.imgCrop = "30px";
    } else if(this.isSideBar || this.isRichiesta){
      this.imgCrop = "60px";
    } else {
      if(this.isDevice){
        this.imgCrop = "80px";
      } else {
        this.imgCrop = "110px";

      }
    }


  }

  
  

  boxImgUtente() {
    return {
      'height': this.imgCrop,
      'width': this.imgCrop,
      'border-radius': '100%',
      'text-align':'center',
      'margin-top':this.isDevice && !this.isSideBar ? '15px' : '0px'
    };
  }


  goToPageUtente(){
    this.ds.updatePage('UTENTE');
    this.route.navigate(['/utente']);
    this.ds.updateSideBar(false);
  }

  goToPageUtenteWithID(){
    this.ds.updatePage('UTENTE');
    this.route.navigate(['/utente'], { queryParams: { id: this.utente.id } });
    this.ds.updateSideBar(false);
  }

  eliminaAccount(){

    this.us.getOBSDelete(this.utente).subscribe(next => {
      localStorage.removeItem('JWT_TOKEN')
      localStorage.removeItem('COOKIE_CONSENT')
      this.us.updateUser(null);
      this.route.navigate(['/']);
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Errore durante l'eliminazione utente");
    })
  }

  close(){
    this.ds.updateSideBar(false);
  }

}
