import { StripeStatus } from "./StripeStatus";

export class Pagamento{

    idStripe: string;
	amount: number;
	amountCapturable: number;
	amountReceived: number;
	applicationFeeAmount: number;
	canceledAt: number;
	cancellationReason: string;
	description: string;
	status: StripeStatus;

}