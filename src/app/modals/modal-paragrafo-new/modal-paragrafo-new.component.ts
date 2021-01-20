import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';
import { ContentModalParagrafoNewComponent } from './content-modal-paragrafo-new/content-modal-paragrafo-new.component';

@Component({
  selector: 'app-modal-paragrafo-new',
  templateUrl: './modal-paragrafo-new.component.html',
  styleUrls: ['./modal-paragrafo-new.component.css']
})
export class ModalParagrafoNewComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ContentModalParagrafoNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
