import type PaymentStrategy from "./PaymentStrategy";

class PaymentContext {
	processPayment(strategy: PaymentStrategy, amount: number) {
		strategy.pay(amount);
	}
}

export default PaymentContext;
