import { Dominio } from './Dominio';
import { Feedback } from './Feedback';
import { Lezione } from './Lezione';
import { User } from './User';

export class Corso{
    owner: User;
    lezioni: Lezione[] = [];
    feeds: Feedback[];
    nomeCorso: string = '';
    descrizioneCorso: string = '';
    tipo: Dominio = new Dominio();
    enable: boolean;
}