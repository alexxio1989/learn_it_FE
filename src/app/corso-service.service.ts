import { Injectable } from '@angular/core';
import { Corso } from './model/Corso';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;

  constructor() { }
}
