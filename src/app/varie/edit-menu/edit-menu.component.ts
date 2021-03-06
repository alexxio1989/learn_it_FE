import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConstantsComponent } from 'src/app/constants/ConstantsComponent';
import { ContentModalCorsoComponent } from 'src/app/modals/content-modal-corso/content-modal-corso.component';
import { ContentModalInfoCorsoComponent } from 'src/app/modals/content-modal-info-corso/content-modal-info-corso.component';
import { ContentModalParagrafoNewComponent } from 'src/app/modals/content-modal-paragrafo-new/content-modal-paragrafo-new.component';
import { Corso } from 'src/app/model/Corso';
import { FileLearnIt } from 'src/app/model/FileLearnIt';
import { Lezione } from 'src/app/model/Lezione';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FileService } from 'src/app/services/file.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isSameUser , getUserLS , isSameUserID} from 'src/app/utils/Util';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  
  fileLearnIt = new FileLearnIt();
  @Input() owner: User;
  @Input() idowner: number;
  user: User;
  @Input() withVideo: boolean;
  @Input() withAdd: boolean;
  @Input() withElimina: boolean;
  @Input() withModifica: boolean;
  @Input() withInfo: boolean;
  @Input() withGoTo: boolean;
  @Input() withDisable: boolean;
  @Input() withAddLezione: boolean;
  @Input() withAddFeed: boolean;
  @Input() obj: any;
  @Input() idPadre: number;
  @Input() section: string;
  @Input() typePadre: string;
  @Input() title: string;
  @Input() show: boolean;
  isLoading: boolean;
  isSamEUser : boolean;
  confirmDelete: boolean;
  corso: Corso;
  isSU: boolean;
  isFU: boolean;
  abilitaVideo:boolean;
  isLogged: boolean;

  component: ComponentType<any>;

  constructor(public dialog: MatDialog,
              private fs: FileService,
              private feeds: FeedbackService,
              private ls: LezioneServiceService,
              private ds: DelegateServiceService,
              private us: UtenteServiceService,
              private route: Router,
              private cs: CorsoServiceService ) { 
                this.us.getOBSUser().subscribe(next => {
                  this.isLogged = getUserLS() !== undefined && getUserLS() !== null;
                  this.user = next;
                  if(this.owner !== undefined){
                    this.isSamEUser = isSameUser(next,this.owner);

                  } else if(this.idowner !== undefined && this.idowner > 0) {

                    this.isSamEUser = isSameUserID(next,this.idowner);

                  }
                })
              }

  ngOnInit(): void {
    this.isLogged = getUserLS() !== undefined && getUserLS() !== null;
    if(this.owner !== undefined){
      this.isSamEUser = isSameUser(getUserLS(),this.owner);
      let utente = getUserLS();
      this.enableVideo();

    } else if(this.idowner !== undefined && this.idowner > 0) {

      this.isSamEUser = isSameUserID(getUserLS(),this.idowner);
      this.enableVideo();
    }
    
    if(this.withVideo){
      this.getVideo();
    }

    if(ConstantsComponent.CORSO === this.typePadre ){
      this.corso = this.obj;
    }
  }

  private enableVideo() {
    let utente = getUserLS();
    if (this.isSamEUser) {
      this.isSU = utente !== null && utente !== undefined && utente.tipo.codice === "SU";
      this.isFU = utente !== null && utente !== undefined && utente.tipo.codice === "FU";
      this.abilitaVideo = this.isSamEUser && (this.isSU || this.isFU);
    }
  }

  info(){
    if(ConstantsComponent.CORSO === this.typePadre ){
      this.component = ContentModalInfoCorsoComponent;
      this.cs.corsoSelected = this.obj;
      this.openDialog();
    }
  }

  elimina(){
    if(ConstantsComponent.CORSO === this.typePadre ){
      this.cs.getOBSDeleteCorso(this.obj).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(next.status);
        this.cs._sbjUpdateCorsi.next(next.list);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status); 
      });
    }
  }

  edit(){
    if(ConstantsComponent.CORSO === this.typePadre ){
      this.cs.corsoSelected = this.obj;
      this.component = ContentModalCorsoComponent;
      this.cs.corsoSelected = this.obj;
      this.openDialog();
    }
  }

  add(){

    if(ConstantsComponent.LEZIONE === this.typePadre ){
      this.component = ContentModalParagrafoNewComponent;
      this.openDialog();

    }
    
  }

  addVideo(event){

    const file = event.target.files[0];
    let newtitolo = this.title.replace(/ /g,"_") + Math.floor(Math.random() * 100);
    this.fileLearnIt.titolo = newtitolo;
    let type = file.type;
    
   

      if ('video/mp4' === type){ 

        if(file.size < 104857600){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              let base64 = reader.result as string;
              this.fileLearnIt.typeFile = type;
              this.fileLearnIt.delete = false;
              this.fileLearnIt.formato = base64.substring(0, base64.indexOf('base64,') + 7) ;
              this.fileLearnIt.base64 = base64.substring(base64.indexOf('base64,') + 7 , base64.length) ;
              this.fileLearnIt.idLezione = this.idPadre;
              this.fs.save(this.fileLearnIt).subscribe(next => {
                this.getVideo();
                this.ds.updateResultService(next.status);
              },error => {
                this.fs.updateSpinnerVideos(false);
                this.ds.updateResultService(error.status);
              })
            };
            
          
        } else {
          this.ds.updateResultService("Dimensioni del file superiore a 100 MB");
        }

    } else {
      this.ds.updateResultService("Formato del file non supportato");
    }

  }


  addVideoBytes(event){

    const file = event.target.files[0];
    let newtitolo = this.title.replace(/ /g,"_") + Math.floor(Math.random() * 100);
    this.fileLearnIt.titolo = newtitolo;
    let type = file.type;
    
   

      if ('video/mp4' === type){ 

        if(file.size < 104857600){
          
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
              this.fileLearnIt.typeFile = type;
              this.fileLearnIt.delete = false;

              this.fileLearnIt.idLezione = this.idPadre;
              if (reader.result instanceof ArrayBuffer) {
                let bytes = new Uint8Array(reader.result).subarray(0, reader.result.byteLength);
                for (var i = 0; i < bytes.byteLength; i++) {
                  this.fileLearnIt.bytes.push(bytes[i]);
                }
                // the rest of your code
              } else {
                throw new Error('Unexpected result');
              }
              
              this.fileLearnIt.idLezione = this.idPadre;
              this.fs.save(this.fileLearnIt).subscribe(next => {
                this.getVideo();
                this.ds.updateResultService(next.status);
              },error => {
                this.fs.updateSpinnerVideos(false);
                this.ds.updateResultService(error.status);
              })
            };
            
          
        } else {
          this.ds.updateResultService("Dimensioni del file superiore a 100 MB");
        }

    } else {
      this.ds.updateResultService("Formato del file non supportato");
    }

  }

  eliminaVideo(){
    
    this.fileLearnIt.delete = true;
   
    this.fs.delete(this.fileLearnIt).subscribe(next => {
      this.getVideo();
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Eliminazione video in errore");
    })
  }

  private getVideo() {
    this.fileLearnIt.idLezione= this.idPadre;
    this.fs.get(this.fileLearnIt).subscribe(next => {
      if (next.obj !== null && next.obj !== undefined) {

        this.fileLearnIt = next.obj;
        this.fs.updateSBJ(this.fileLearnIt);
       

      } else {
        this.fileLearnIt.base64 = undefined;
      }
      this.fs.updateSpinnerVideos(false);
    }, error => {
      this.fs.updateSpinnerVideos(false);
      this.ds.updateResultService(error.status);
    });
  }




  openDialog() {
    const dialogRef = this.dialog.open(this.component, {
       
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  updateVisCorso(){ 
    let corso = this.obj;
    corso.enable = !corso.enable;
    this.cs.getOBSUpdateVisCorso(corso).subscribe(next=>{
      this.ds.updateResultService("Visibilità del corso modificata correttamente")
      this.ds.updateSpinner(false);
    },error=>{
      this.ds.updateResultService("Errore durante la modificata alla visibilità del corso")
      this.ds.updateSpinner(false);
    })
  }


  goTo(){

    if(ConstantsComponent.CORSO === this.typePadre ){
      let corso = this.obj;
      localStorage.setItem('CORSO' , JSON.stringify(corso));
      this.cs.corsoSelected = corso;
      this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 

    } else if(ConstantsComponent.LEZIONE === this.typePadre ){

    }
  }

  addLezione() {
    let lezione = new Lezione();
    lezione.idCorso = this.corso.id;
    lezione.indexLezione = this.corso.lezioni.length + 1;
    this.ls._sbjNewLezione.next(lezione);
  }

  addFeed() {
    
    this.feeds._sbjNewFeed.next(true);
    //this.corso.lezioni.push(this.lezione);
  }

}
