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

    this.getVideos();
    
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.width = 350;
      this.height = 250
    } else {
      this.width = 640;
      this.height = 480
    }
  }

  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;

  private getVideos() {
    this.fileLearnIt.idPadre = this.idPadre;
    this.fileLearnIt.typePadre = this.typePadre;
    this.fs.getVideos(this.fileLearnIt).subscribe(next => {
      if (next.list !== null && next.list !== undefined && next.list.length > 0) {
        let file = new FileLearnIt();
        file = next.list[0];
        this.fileLearnIt.id = file.id;
        console.log(file.formato + file.base64);
        let base64 = '';
        next.list.forEach(element => {
          base64 = base64 + element.base64;
        });
        this.base64 =file.formato + base64;

      } else {
        this.base64 = undefined;
      }
      this.ds.updateSpinnerVideos(false);
    }, error => {
      this.ds.updateSpinnerVideos(false);
      this.ds.updateResultService(error.status);
    });
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
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
           
            this.ds.updateSpinnerVideos(false);
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
   
    this.ls.insertVideo(this.fileLearnIt).subscribe(next => {
      this.getVideos();
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Eliminazione video avvenuto con successo");
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Eliminazione video in errore");
    })
  }

}
