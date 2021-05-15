import { Money } from "./Money";
import { Pagamento } from "./Pagamento";


export class Resoconto{
    available: Money[] =[];
    connectReserved: Money[] =[];
    pending: Money[] =[];
    listPagamenti: Pagamento[] = [];
    loaded = false;
}