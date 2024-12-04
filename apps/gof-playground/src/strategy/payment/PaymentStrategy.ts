interface PaymentStrategy {
	pay(amount: number): void;
	validate(): boolean;
}

export default PaymentStrategy;
