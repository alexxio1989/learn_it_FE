import { Bank } from './Bank';
import { Corso } from './Corso';
import { Dominio } from './Dominio';
import { Recapito } from './Recapito';

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
    idStripe: string;
    phone: string;
    dataNascita: Date;
    recapito: Recapito = new Recapito();
    bank: Bank = new Bank();
    
}