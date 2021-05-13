import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.css']
})
export class InfoProfileComponent implements OnInit {

  @Input() utente : User;

  constructor() { }

  ngOnInit(): void {
  }

}
