import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../atomic/Button/Button";
const StripePayment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		sessionStorage.setItem("ModeOfPayment", "Credit Card");

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsProcessing(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {},
			redirect: "if_required",
		});

		if (error) {
			if (error.type === "card_error" || error.type === "validation_error") {
        console.log(error.message)
			} else {
				console.log("An unexpected error occured.");
			}
			setIsProcessing(false);
		} else paymentIntent && paymentIntent.status === "succeeded";
		{
			const res = await fetch("/api/get-card-details", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					paymentMethodId: paymentIntent?.payment_method,
				}),
			});
		}
	};

	return (
		<div>
				<div>
					<PaymentElement />
					<Button
						onClick={(e) => handleSubmit(e)}
						variant="secondary"
						style={{ width: "100%", marginTop: "12px" }}
					>
						PAY
					</Button>
				</div>
		</div>
	);
};

export default StripePayment;
