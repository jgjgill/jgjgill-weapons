import type PaymentStrategy from "./PaymentStrategy";

class PayPalStrategy implements PaymentStrategy {
	constructor(
		private email: string,
		private password: string,
	) {}

	validate(): boolean {
		return this.email.includes("@");
	}

	pay(amount: number): void {
		if (this.validate()) {
			console.log(`${amount}원을 PayPal로 결제했습니다.`);
		} else {
			throw new Error("Invalid PayPal credentials");
		}
	}
}

export default PayPalStrategy;
