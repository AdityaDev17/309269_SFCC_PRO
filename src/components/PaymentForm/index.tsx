import {
  ADD_PAYMENT_INSTRUMENT_TO_BASKET,
  CREATE_ORDER,
} from "@/common/schema";
import { graphqlRequest } from "@/lib/graphqlRequest";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../atomic/Button/Button";
const StripePayment = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const basketId = sessionStorage.getItem("basketId") ?? "";

  type PaymentInstrumentInput = {
    basketId: string;
    items: {
      paymentMethodId: string;
      paymentCard: {
        cardType: string;
        expirationMonth: number;
        expirationYear: number;
        holder: string;
        maskedNumber: string;
      };
    };
  };

  type OrderInput = {
    basketId: string;
  };

  const addPaymentInstrumentToBasket = useMutation({
    mutationFn: (input: PaymentInstrumentInput) =>
      graphqlRequest(ADD_PAYMENT_INSTRUMENT_TO_BASKET, { input }),
    retry: 2,
  });

  const createOrder = useMutation({
    mutationFn: (input: OrderInput) => graphqlRequest(CREATE_ORDER, { input }),
    retry: 2,
  });

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
        console.log(error.message);
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
      const data = await res.json();
      try {
        const response = await addPaymentInstrumentToBasket.mutateAsync({
          basketId,
          items: {
            paymentMethodId: "CREDIT_CARD",
            paymentCard: {
              cardType: "Visa",
              expirationMonth: data?.paymentMethodDetails?.card?.exp_month,
              expirationYear: data?.paymentMethodDetails?.card?.exp_year,
              holder: "kavya",
              maskedNumber: `**********${data?.paymentMethodDetails?.card?.last4}`,
            },
          },
        });
		if(response?.addPaymentInstrumentToBasket?.basketId)
		{
		  const order = await createOrder.mutateAsync({
          basketId,
        });
        if (order?.createOrder?.orderNo) {
          sessionStorage.removeItem("basketId");
          router.push(`/order-confirmation/${order?.createOrder?.orderNo}`);
        }
		}
      } catch (error) {
        console.error("Failed to add payment instrument:", error);
      }
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
