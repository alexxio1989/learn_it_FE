import { ComponentType } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-modal-core',
  templateUrl: './modal-core.component.html',
  styleUrls: ['./modal-core.component.css']
})
export class ModalCoreComponent implements OnInit {

  @Input() style : string;

  @Input() class : string;

  @Input() icon : string;

  @Input() descButton : string;

  @Input() objSelected : any;

  @Input() visible = true;

  @Input() isButton : boolean;

  @Input() isButtonMenu : boolean;

  @Input() component: ComponentType<any>;

  constructor(public dialog: MatDialog,private ds: DelegateServiceService) { }

  ngOnInit(): void {
  }

  openDialog() {
    
    this.ds.objSelected = this.objSelected;
    const dialogRef = this.dialog.open(this.component);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
