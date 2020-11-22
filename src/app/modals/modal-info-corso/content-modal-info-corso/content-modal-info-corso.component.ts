import { Component, OnInit } from '@angular/core';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';

@Component({
  selector: 'app-content-modal-info-corso',
  templateUrl: './content-modal-info-corso.component.html',
  styleUrls: ['./content-modal-info-corso.component.css']
})
export class ContentModalInfoCorsoComponent implements OnInit {

  corso: Corso;

  constructor(private cs: CorsoServiceService) { }

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
  }

}
