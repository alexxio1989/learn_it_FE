
import { DecimalPipe } from '@angular/common';
import { Dominio } from './Dominio';
import { Feedback } from './Feedback';
import { Lettura } from './Lettura';
import { Lezione } from './Lezione';
import { User } from './User';

export class Corso{
    id: number;
    owner: User;
    image: String;
    lezioni: Lezione[] = [];
    feeds: Feedback[] = [];
    nomeCorso: string = '';
    subNomeCorso: string = '';
    descrizioneCorso: string = '';
    tipo: Dominio = new Dominio();
    enable: boolean;
    prezzo: number;
    listLetture: Lettura[];
    stripeToken: string;
    acquirente: User;
    aPagamento: boolean;
    colorCard: string ;
    totFeeds:number;
    mediumFeeds:number;
}