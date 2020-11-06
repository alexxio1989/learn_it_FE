import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from '../../corso-service.service';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-corso',
  templateUrl: './page-corso.component.html',
  styleUrls: ['./page-corso.component.css']
})
export class PageCorsoComponent implements OnInit {

  corso: Corso;

  constructor(private cs: CorsoServiceService , private route: Router) { }

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
    if(this.corso === undefined || this.corso.nomeCorso === ''){
      this.route.navigate(['/']);
    }
  }
}
