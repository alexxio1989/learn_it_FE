import { Corso } from './Corso';
import { Dominio } from './Dominio';

export class User{
    id: number;
    email: string;
    password: string;
    nome: string;
    cognome: string;
    tipo: Dominio = new Dominio();
    corsiLetti: Corso[];
    propriCorsi: Corso[];
    descrizione: string;
    attivita: string;
    img: string;
    
}