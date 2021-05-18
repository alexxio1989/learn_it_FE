import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit {

  @Input() label : string = 'Carica immagine';
  @Input() type : string = 'png';
  @Input() ratio : number;
  @Output() base65 = new EventEmitter<string>();
  @Input() base65Input : string;
  
  imageChangedEvent: any = '';
  changeing: boolean;

  constructor() {
      this.ratio = 1;
  }

  ngOnInit(): void {
      if(this.base65Input !== undefined && this.base65Input !== null && this.base65Input !== ''){
        this.base65Input = 'data:image/png;base64,' + this.base65Input;

      }
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
      this.changeing = true;
      this.base65.emit(event.base64)
  }
  imageLoaded(image: any) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}
