import { Dominio } from './Dominio';
import { Lezione } from './Lezione';
import { User } from './User';

export class Corso{
    owner: User;
    lezioni: Lezione[];
    nomeCorso: string = '';
    descrizioneCorso: string = '';
    tipo: Dominio = new Dominio();
    enable: boolean;
}