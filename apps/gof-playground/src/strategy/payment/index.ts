import CreditCardStrategy from "./CreditCardStrategy";
import PayPalStrategy from "./PayPalStrategy";
import PaymentContext from "./PaymentContext";

const payment = new PaymentContext();

const creditCard = new CreditCardStrategy(
	"1234567890123456",
	"123",
	"12/24",
	"홍길동",
);

const paypal = new PayPalStrategy("user@example.com", "password");

payment.processPayment(creditCard, 50000);
payment.processPayment(paypal, 50000);
