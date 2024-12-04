import type PaymentStrategy from "./PaymentStrategy";

class CreditCardStrategy implements PaymentStrategy {
	constructor(
		private cardNumber: string,
		private cvv: string,
		private dateOfExpiry: string,
		private cardHolderName: string,
	) {}

	validate(): boolean {
		return this.cardNumber.length === 16 && this.cvv.length === 3;
	}

	pay(amount: number): void {
		if (this.validate()) {
			console.log(`${amount}원을 신용카드로 결제하였습니다.`);
		} else {
			throw new Error("Invalid card details");
		}
	}
}

export default CreditCardStrategy;
