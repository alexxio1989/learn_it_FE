import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CorsoServiceService } from '../corso-service.service';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { isEmptyString } from '../utils/Util';

@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.css']
})
export class ModalCorsoComponent implements OnInit {

  @Output() corso = new EventEmitter<Corso>();
  @Input() tipoCorsoList;

  nomeCorso: string = '';
  descCorso: string = '';
  tipoCorso: Dominio;

  ngOnInit(): void {
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService) {}

  get disableSave(){
    return isEmptyString(this.nomeCorso) || isEmptyString(this.descCorso) || (this.tipoCorso === undefined || this.tipoCorso.codice === '');
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli il tipo di corso' : 'Tipologia del corso : ' + this.tipoCorso.descrizione;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let corso = new Corso();
      corso.nomeCorso = this.nomeCorso;
      corso.descrizioneCorso = this.descCorso;
      corso.tipo = this.tipoCorso;
      corso.owner = this.cs.user;
      this.corso.emit(corso);
      this.closeResult = `Closedddd with: ${result}`;
    });
  }




  changeTipoCorso(obj: Dominio) {
    this.tipoCorso = obj;
  }

  changeNomeCorso(value: string) {
    this.nomeCorso = value;
  }

  changeDescCorso(value: string) {
    this.descCorso = value;
  }


}
