import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Corso } from './Corso';
import { User } from './User'


export class Acquisto{
    acquirente : User;
    owner: User;
    stripeToken: string;
    total: number;
    causale: string;
    type: string;
    corso: Corso;
}