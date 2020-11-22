import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { ContentModalInfoCorsoComponent } from './content-modal-info-corso/content-modal-info-corso.component'

@Component({
  selector: 'app-modal-info-corso',
  templateUrl: './modal-info-corso.component.html',
  styleUrls: ['./modal-info-corso.component.css']
})
export class ModalInfoCorsoComponent{

  @Input() corso: Corso;

  constructor(public dialog: MatDialog , private cs: CorsoServiceService) {}

  openDialog() {
    this.cs.corsoSelected = this.corso;
    const dialogRef = this.dialog.open(ContentModalInfoCorsoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
