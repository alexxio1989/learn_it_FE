import {SubDominio} from './SubDominio';

export class Dominio{
    id: number;
    codice: string;
    descrizione: string;
    sottoTipi: SubDominio[] = [];

    pageIndex: number = 0;
    pageSize: number = 3;
    lowValue: number = 0;
    highValue: number = 3;
    edit:boolean;
}