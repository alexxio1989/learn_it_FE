import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso',
  templateUrl: './content-modal-corso.component.html',
  styleUrls: ['./content-modal-corso.component.css']
})
export class ContentModalCorsoComponent implements OnInit {

  aPagamento: boolean;

  nomeCorso: string = '';
  subNomeCorso: string = '';
  descCorso: string = '';
  tipoCorso: Dominio;
  subTipo: SubDominio;
  tipoCorsoList = []
  prezzo: number;
  image: string;

  newType: Dominio = new Dominio();
  newSubType: SubDominio = new SubDominio();

  isShowSaveTipo: boolean;
  isShowSaveSubTipo: boolean;

  ngOnInit(): void {
    this.tipoCorsoList = this.cs.tipoCorsoList;
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService , private ds: DelegateServiceService) {
    this.ds.getOBSTipiCorso().subscribe(next => {
      this.tipoCorsoList = next;
    })
  }


  get disableSave(){
    return isEmptyString(this.nomeCorso) || isEmptyString(this.descCorso) || (this.subTipo === undefined || this.subTipo.codice === '');
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli il tipo di corso' : this.tipoCorso.descrizione;
  }

  get labelSubTipoCorso(){
    return (this.subTipo === undefined || this.subTipo.codice === '') ? 'Scegli il tipo di corso' : this.subTipo.descrizione;
  }

  salva() {
   
      let corso = new Corso();
      corso.nomeCorso = this.nomeCorso;
      corso.subNomeCorso = this.subNomeCorso;
      corso.descrizioneCorso = this.descCorso;
      corso.tipo = this.subTipo;
      corso.image = this.image;
      corso.owner = JSON.parse(localStorage.getItem('USER'));
      corso.prezzo = this.prezzo;
      this.cs.getOBSInsertCorso(corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Corso salvato correttamente");
        this.cs.updateCorsi(next.list);
        this.ds.updateSideBar(false);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Errore durante la creazione del corso");
      });
    
  }

  changeTipoCorso(obj: Dominio) {
    this.subTipo = undefined;
    this.tipoCorso = obj;
  }

  changeSubTipoCorso(obj: SubDominio) {
    this.subTipo = obj;
  }

  changeShowSaveTipo() {
    this.isShowSaveTipo = !this.isShowSaveTipo;
  }

  changeShowSaveSubTipo() {
    this.isShowSaveSubTipo = !this.isShowSaveSubTipo;
  }

  salvaTipo(){
    console.log(this.newType.descrizione);
    this.ds.updateSpinner(true);
    this.cs.getOBSInsertTypes(this.newType).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
      this.changeShowSaveTipo();
    },error =>{
      this.ds.updateResultService("Inserimento tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  salvaSubTipo(){
    console.log(this.newSubType.descrizione);
    this.newSubType.idPadre = this.tipoCorso.id;
    this.ds.updateSpinner(true);
    this.cs.getOBSInsertSubTypes(this.newSubType).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
      this.changeShowSaveSubTipo();
    },error =>{
      this.ds.updateResultService("Inserimento sotto tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  openInput(){ 
    document.getElementById("fileInput").click();
  }

  fileChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result as string;
      console.log(this.image);
    };
  }

}
