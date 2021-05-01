import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent{

  @Input() ratio : number;
  @Output() base65 = new EventEmitter<string>();
  
  imageChangedEvent: any = '';

  constructor() {
      this.ratio = 3;
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
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
