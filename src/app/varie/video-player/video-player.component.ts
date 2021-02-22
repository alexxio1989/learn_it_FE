import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FileLearnIt } from 'src/app/model/FileLearnIt';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FileService } from 'src/app/services/file.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input() idPadre: number;
  @Input() typePadre: string;
  @Input() title: string;
  fileLearnIt = new FileLearnIt();
  isLoading: boolean;
  base64: string

  width: number;
  height: number;


  constructor(private deviceService: DeviceDetectorService, private fs: FileService,private ds: DelegateServiceService, private ls: LezioneServiceService) { 
    this.ds.getOBSSpinnerVideo().subscribe(next=>{
      this.isLoading = next;
    })
   
  }

  ngOnInit(): void {

    this.getVideo();
    
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.width = 350;
      this.height = 250
    } else {
      this.width = 640;
      this.height = 480
    }
  }


  private getVideo() {
    this.fileLearnIt.idPadre = this.idPadre;
    this.fileLearnIt.typePadre = this.typePadre;
    this.fs.get(this.fileLearnIt).subscribe(next => {
      if (next.obj !== null && next.obj !== undefined) {

        this.fileLearnIt = next.obj;
       

      } else {
        this.fileLearnIt.base64 = undefined;
      }
      this.ds.updateSpinnerVideos(false);
    }, error => {
      this.ds.updateSpinnerVideos(false);
      this.ds.updateResultService(error.status);
    });
  }



  fileChange(event){
    
    const file = event.target.files[0];
    let newtitolo = this.title.replace(/ /g,"_") + Math.floor(Math.random() * 100);
    this.fileLearnIt.titolo = newtitolo;
    let type = file.type;
    
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

}
