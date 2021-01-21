import { Corso } from './Corso';

export class SubDominio {

    id: number;
    codice: string;
    descrizione: string;
    idPadre: number;
    corsiAssociati: Corso[];

    pageIndex: number = 0;
    pageSize: number = 3;
    lowValue: number = 0;
    highValue: number = 3;
}