//To run this file write: node send-email.js   in directory terminal, http://localhost:3000/send-email
const express = require('express');
const { EmailClient } = require("@azure/communication-email");

const app = express();
const port = 3000;

const connectionString = "endpoint=https://communication-service-resource-1.unitedstates.communication.azure.com/;accesskey=boyouDdZ7MbN7qMZU/f4ZpfNg/QChDHaLT7CtRUvrjSxv9Usy7iFJP6yWg7JVfQdPWHBtEKGhjevfHsc58Vl3A==";
const client = new EmailClient(connectionString);

app.use(express.json()); // Middleware to parse JSON in the request body

app.post('/send-email', async (req, res) => {
    try {
        const { subject, plainText, toAddress } = req.body;

        const emailMessage = {
            senderAddress: "DoNotReply@dcf1db72-af8d-4744-93dd-ca34e1bb5894.azurecomm.net",
            content: {
                subject: subject,
                plainText: plainText,
            },
            recipients: {
                to: [{ address: toAddress }],
            },
        };

        const poller = await client.beginSend(emailMessage);
        //const result = await poller.pollUntilDone();
        const result = 'Done';

        res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
