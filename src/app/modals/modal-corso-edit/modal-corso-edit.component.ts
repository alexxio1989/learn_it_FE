import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString } from 'src/app/utils/Util';
import { ContentModalCorsoEditComponent } from './content-modal-corso-edit/content-modal-corso-edit.component';

@Component({
  selector: 'app-modal-corso-edit',
  templateUrl: './modal-corso-edit.component.html',
  styleUrls: ['./modal-corso-edit.component.css']
})
export class ModalCorsoEditComponent{

  @Input() corso: Corso;

  constructor(public dialog: MatDialog , private cs: CorsoServiceService) {}

  openDialog() {
    this.cs.corsoSelected = this.corso;
    const dialogRef = this.dialog.open(ContentModalCorsoEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
