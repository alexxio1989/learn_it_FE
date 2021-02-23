import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsComponent } from 'src/app/constants/ConstantsComponent';
import { ContentModalCorsoEditComponent } from 'src/app/modals/content-modal-corso-edit/content-modal-corso-edit.component';
import { ContentModalInfoCorsoComponent } from 'src/app/modals/content-modal-info-corso/content-modal-info-corso.component';
import { ContentModalParagrafoNewComponent } from 'src/app/modals/modal-paragrafo-new/content-modal-paragrafo-new/content-modal-paragrafo-new.component';
import { FileLearnIt } from 'src/app/model/FileLearnIt';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  
  fileLearnIt = new FileLearnIt();

  @Input() withVideo: boolean;
  @Input() withAdd: boolean;
  @Input() withElimina: boolean;
  @Input() withModifica: boolean;
  @Input() withInfo: boolean;
  @Input() obj: any;
  @Input() idPadre: number;
  @Input() section: string;
  @Input() typePadre: string;
  @Input() title: string;
  isLoading: boolean;

  component: ComponentType<any>;

  constructor(public dialog: MatDialog,private fs: FileService,
              private ds: DelegateServiceService,
              private cs: CorsoServiceService ) { }

  ngOnInit(): void {

    if(this.withVideo){
      this.getVideo();
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
        this.cs.updateCorsi(next.list);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status); 
      });
    }
  }

  edit(){
    if(ConstantsComponent.CORSO === this.typePadre ){
      this.component = ContentModalCorsoEditComponent;
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
              this.fileLearnIt.idPadre = this.idPadre;
              this.fileLearnIt.typePadre = this.typePadre;
              this.fs.save(this.fileLearnIt).subscribe(next => {
                this.getVideo();
                this.ds.updateResultService(next.status);
              },error => {
                this.ds.updateSpinnerVideos(false);
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
    this.fileLearnIt.idPadre = this.idPadre;
    this.fileLearnIt.typePadre = this.typePadre;
    this.fs.get(this.fileLearnIt).subscribe(next => {
      if (next.obj !== null && next.obj !== undefined) {

        this.fileLearnIt = next.obj;
        this.fs.updateSBJ(this.fileLearnIt);
       

      } else {
        this.fileLearnIt.base64 = undefined;
      }
      this.ds.updateSpinnerVideos(false);
    }, error => {
      this.ds.updateSpinnerVideos(false);
      this.ds.updateResultService(error.status);
    });
  }



  openDialog() {
    const dialogRef = this.dialog.open(this.component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
