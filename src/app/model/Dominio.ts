import { Corso } from "./Corso";


export class Dominio{
    id: number;
    codice: string;
    descrizione: string;
    corsiAssociati: Corso[] = [];

    pageIndex: number = 0;
    pageSize: number = 3;
    lowValue: number = 0;
    highValue: number = 3;
    edit:boolean;

    text: string;
    img: string;
}