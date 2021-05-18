import { DominioStripe } from "./DominioStripe";


export class StripeStatus{
    status: string; 
	error:boolean;
	missings: DominioStripe[] = [];
	errors: DominioStripe[] = [];
	color: string;
	docNeeded: boolean;
	extraDocNeeded: boolean;
}