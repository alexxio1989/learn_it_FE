import { Paragrafo } from './Paragrafo';

export class Lezione {
    id: number;
    idCorso: number;
    indexArray: number = 0;
    title: string = '';
    content: string;
    listaParagrafi: Paragrafo[] = [];
}