import { User } from './User';


export class Richiesta{
    id: number;
	utente: User;
	motivazione: string;
	dataRichiesta: Date;
	approvato: boolean;
}