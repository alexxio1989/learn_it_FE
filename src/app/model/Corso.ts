
import { Feedback } from './Feedback';
import { Lezione } from './Lezione';
import { SubDominio } from './SubDominio';
import { User } from './User';

export class Corso{
    id: number;
    owner: User;
    lezioni: Lezione[] = [];
    feeds: Feedback[] = [];
    nomeCorso: string = '';
    descrizioneCorso: string = '';
    tipo: SubDominio = new SubDominio();
    enable: boolean;
}