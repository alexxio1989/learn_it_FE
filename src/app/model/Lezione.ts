import { FileLearnIt } from './FileLearnIt';
import { Paragrafo } from './Paragrafo';

export class Lezione {
    id: number;
    idCorso: number;
    indexLezione: number = 0;
    title: string = '';
    subTitle: string = '';
    content: string;
    listaParagrafi: Paragrafo[] = [];
    idOwner: number;
    video: FileLearnIt = new FileLearnIt();
}