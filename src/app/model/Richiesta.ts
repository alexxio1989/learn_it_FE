import { User } from './User';


export class Richiesta{
    id: number;
	utente: User = new User();
	motivazione: string ='';
	dataRichiesta: Date;
	approvato: boolean;
	front: string;
	back: string;
}