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

    this.fs.getSBJ().subscribe(next => {
      this.fileLearnIt = next;
    })
    
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.width = 350;
      this.height = 250
    } else {
      this.width = 640;
      this.height = 480
    }
  }


}
