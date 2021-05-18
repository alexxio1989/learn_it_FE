import { Bank } from './Bank';
import { Corso } from './Corso';
import { Dominio } from './Dominio';
import { Recapito } from './Recapito';
import { StripeStatus } from './StripeStatus';

export class User{

    id: number;
    email: string;
    password: string;
    confermaPassword: string;
    confirmPassword: string;
    datiRegistrazioneUnCompleted = true;
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
    mediaCorsi: number = 0;
    totCorsiPubblicati: number = 0;
    ip: string;
    docFront64: string;
	docBack64: string;
    doc1Front64: string;
	doc1Back64: string;

    datiAccessoCompleted = false;
    datiAnagraficiCompleted = false;
    datiBancariCompleted = false;
    documentiNecessariCompleted = false;

    isSigningGoogle = false;

    accountStripeStatus = new StripeStatus();
	enablePayments= new StripeStatus();
    
}