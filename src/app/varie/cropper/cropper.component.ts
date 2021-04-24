import { Component, OnInit, Output , EventEmitter} from '@angular/core';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent{

  @Output() base65 = new EventEmitter<string>();
  
  imageChangedEvent: any = '';

  constructor() { }

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
