import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from '../corso-service.service';
import { Corso } from '../model/Corso';

@Component({
  selector: 'app-corso',
  templateUrl: './corso.component.html',
  styleUrls: ['./corso.component.css']
})
export class CorsoComponent implements OnInit {

  corso: Corso;

  constructor(private cs: CorsoServiceService , private route: Router) { }

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
    if(this.corso === undefined || this.corso.nomeCorso === ''){
      this.route.navigate(['/']);
    }
  }

}
