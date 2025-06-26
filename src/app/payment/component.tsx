"use client";

import { GET_BASKET } from "@/common/schema";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/organisms/OrderSummary/OrderSummary";
import { graphqlRequest } from "@/lib/graphqlRequest";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styles from "./payment.module.css";

const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!publicKey) {
    throw new Error("Stripe public key is missing in environment variables.");
}

const stripePromise = loadStripe(publicKey);

export default function Payment() {
    const [basketId, setBasketId] = useState("");

    useEffect(() => {
        const id = sessionStorage.getItem("basketId") ?? "";
        setBasketId(id);
    }, []);
    const appearance = {
        theme: "stripe",
    };
    const { data } = useQuery({
        queryKey: ["GetBasket", basketId],
        queryFn: () => graphqlRequest(GET_BASKET, { basketId: basketId }),
        enabled: !!basketId,
        retry: 2,
    });
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        if (data) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                body: JSON.stringify({
                    basketDetails: data,
                }),
            })
                .then(async (result) => {
                    const { clientSecret } = await result.json();
                    setClientSecret(clientSecret);
                })
                .catch((err) => {});
        }
    }, [data]);

    return (
        <div className={styles.container}>
            <div>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm />
                    </Elements>
                )}
            </div>
            <div className={styles.orderSummarySection}>
                <OrderSummary
                    totalRowTop={true}
                    isButton={false}
                    totalAmt={data?.basketInfo?.productTotal}
                    currency={data?.basketInfo?.currency}
                    subTotal={data?.basketInfo?.productSubTotal}
                />
            </div>
        </div>
    );
}
