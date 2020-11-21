import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentModalCorsoComponent } from './content-modal-corso/content-modal-corso.component';


@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.css']
})
export class ModalCorsoComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ContentModalCorsoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
