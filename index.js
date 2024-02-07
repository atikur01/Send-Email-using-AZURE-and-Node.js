const { EmailClient } = require("@azure/communication-email");

// This code retrieves your connection string from an environment variable.
const connectionString = "endpoint=https://communication01.asiapacific.communication.azure.com/;accesskey=GXNgKKNAvEVzObzyQf17X4OTwm4PdI+UZb5jHuQOskPDy/F4UesyVu+ISXFzwiyqc1iLw4qN3JtFGcKVs5VpiQ==";
const client = new EmailClient(connectionString);

async function main() {
    try {
        const emailMessage = {
            senderAddress: "DoNotReply@fb3c20b3-0656-44c8-9ee0-04bb849af6c4.azurecomm.net",
            content: {
                subject: "Test Email erg ",
                plainText: "Hello world via email.tfgse",
            },
            recipients: {
                to: [{ address: "vfkjzoial@eurokool.com" }],
            },
        };

        const poller = await client.beginSend(emailMessage); // Fix: pass emailMessage instead of message
        const result = await poller.pollUntilDone();
        console.log("Email sent successfully:", result);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

main();
