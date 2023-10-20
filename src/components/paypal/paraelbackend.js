const paypal = require('@paypal/checkout-server-sdk');
const { ID_CLIENT, CLIENT_SECRET } = process.env;

const environment = new paypal.core.SandboxEnvironment(ID_CLIENT, CLIENT_SECRET);

// const client = new paypal.core.PayPalHttpClient(environment);
// module.exports = client;

//descomentar las lineas anteriores, lo estoy haciendo todo en un archivo;
// esto es para configurar



//controlador
// const client = require('archivo en el que se encuentra el cliente, la variable anterior con el mismo nombre "client" ')
const createOrderPaypal = async (request, response) => {
    const order = new paypal.orders.OrdersCreateRequest();

    order.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: "USD", //ulala
                    value: "100.00", //ejemplo pendejo 
                },
                description: "Curso de EStaesnifeado chancla"
            }
        ]
    })
    responseOrder = await client.execute(order);


    return response.status(200).json({ id: responseOrder.result.id });
}
//esto es todo lo que necesita para hacer la compra, introducir la logica para cambiar el el usuario 