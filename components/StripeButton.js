import React from "react";
import {useRouter} from "next/router";
import StripeCheckout from 'react-stripe-checkout';
import {
	Text,
	Stack,
	useToast,
} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";

const StripeButton = ({price,email,children}) => {
	const priceForStripe = price * 100;
	const publishableKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
    const toast= useToast();
    const router = useRouter();
    const onToken = token => {
    	//back-end code here
    	toast({
    		position:"top",
			render:function t(){return (
				<Stack fontSize="1.6rem" borderRadius={5} direction="row" bg="green.500" color="white" px="2rem" py="1rem" spacing="15px">
				       <Stack direction="column">
				        <CheckCircleIcon boxSize="2.5rem"/>
					   </Stack>
					    <Stack direction="column">
							<Text>Payment Successful!</Text>
							<Text>You paid ${price}.It may take max 3days to arrive at your door.Thank you for shopping.</Text>
						</Stack>
				</Stack>
			)},
			onCloseComplete: () => {
				router.push("/");
			}
		})
    }

	return (
		<StripeCheckout
		   label="Buy Now"
		   name="Bimal Thapa Magar's Ecommerce"
		   email={email || ""}
		   panelLabel="Buy Now"
		   billingAddress
		   shippingAddress
		   description={`Your total price is $${price}`}
		   amount={priceForStripe}
		   currency="USD"
		   stripeKey={publishableKey}
		   token={onToken}
		>
		{children}
		</StripeCheckout>
	)
};

export default StripeButton;