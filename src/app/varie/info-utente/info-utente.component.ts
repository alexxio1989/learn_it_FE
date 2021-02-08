import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalEditUtenteComponent } from 'src/app/modals/modal-edit-utente/modal-edit-utente.component';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.css']
})
export class InfoUtenteComponent implements OnInit {

  @Input() utente: User;
  @Input() isSideBar: boolean;
  @Input() isCardCorso: boolean;
  isDevice: boolean;

  imgCrop = "150px";

  constructor(private route: Router,private ds: DelegateServiceService,private us: UtenteServiceService,public dialog: MatDialog,private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isDevice = this.deviceService.isMobile();
    this.utente.attivita = "Sviluppatore Front-End / Back-End"

    if(this.isCardCorso){
      this.imgCrop = "30px";
    } else if(this.isSideBar){
      this.imgCrop = "60px";
    } else {
      this.imgCrop = "100px";
    }


  }

  

  boxImgUtente() {
    return {
      'height': this.imgCrop,
      'width': this.imgCrop,
      'border-radius': '100%',
      'text-align':'center',
      'margin-left': 'auto',
      'margin-right': 'auto',
    };
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalEditUtenteComponent);

    this.ds.utente = this.utente;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToPageUtente(){
    this.route.navigate(['/utente']);
    this.ds.updateSideBar(false);
  }

}