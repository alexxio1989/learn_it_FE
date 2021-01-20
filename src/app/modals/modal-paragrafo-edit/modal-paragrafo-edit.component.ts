import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';
import { ContentModalParagrafoEditComponent } from './content-modal-paragrafo-edit/content-modal-paragrafo-edit.component';

@Component({
  selector: 'app-modal-paragrafo-edit',
  templateUrl: './modal-paragrafo-edit.component.html',
  styleUrls: ['./modal-paragrafo-edit.component.css']
})
export class ModalParagrafoEditComponent {

  @Input() paragrafo: Paragrafo;

  constructor(public dialog: MatDialog , private ps: ParagrafoServiceService) {}

  openDialog() {
    this.ps.paragrafoSelected = this.paragrafo;
    const dialogRef = this.dialog.open(ContentModalParagrafoEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
