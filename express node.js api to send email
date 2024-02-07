const express = require('express');
const { EmailClient } = require('@azure/communication-email');

const app = express();
const port = 8080; // You can use any available port

// This code retrieves your connection string from an environment variable.
const connectionString = "endpoint=https://communication01.asiapacific.communication.azure.com/;accesskey=GXNgKKNAvEVzObzyQf17X4OTwm4PdI+UZb5jHuQOskPDy/F4UesyVu+ISXFzwiyqc1iLw4qN3JtFGcKVs5VpiQ==";
const client = new EmailClient(connectionString);

app.use(express.json());

app.post('/send-email', async (req, res) => {
    try {
        // Validate the request payload
        if (!req.body.subject || !req.body.message || !req.body.to) {
            throw new Error("Invalid request payload. Subject, message, and recipient are required.");
        }

        const emailMessage = {
            senderAddress: "DoNotReply@fb3c20b3-0656-44c8-9ee0-04bb849af6c4.azurecomm.net",
            content: {
                subject: req.body.subject,
                plainText: req.body.message,
            },
            recipients: {
                to: [{ address: req.body.to }],
            },
        };

        // Log the constructed emailMessage for debugging
        console.log("Constructed Email Message:", emailMessage);

        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();
        console.log("Email sent successfully:", result);

        res.status(200).json({ message: 'Email sent successfully', result });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
