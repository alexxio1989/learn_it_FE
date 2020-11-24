import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { getUserLS , isNullObj} from '../../utils/Util';

@Component({
  selector: 'app-page-utente',
  templateUrl: './page-utente.component.html',
  styleUrls: ['./page-utente.component.css']
})
export class PageUtenteComponent implements OnInit {

  utente: User;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.utente = getUserLS();
    if(isNullObj(this.utente)){
      this.route.navigate(['/']);
    }
  }

}
