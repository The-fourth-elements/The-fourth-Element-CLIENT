import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { NextUIProvider } from "@nextui-org/react";

const Provider = ({ children }) => {
    return (
        <NextUIProvider>
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_ID_CLIENT }}>
                {children}
            </PayPalScriptProvider>
        </NextUIProvider>
    )
}

export default Provider