document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("subscribe-form");
    const emailInput = document.getElementById("email");
    const statusMessage = document.getElementById("status");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Replace with your Mailchimp API endpoint
        const mailchimpAPIEndpoint = 'https://<YOUR_DC>.api.mailchimp.com/3.0/lists/<YOUR_LIST_ID>/members';

        // Replace with your Mailchimp API key
        const apiKey = 'YOUR_API_KEY';

        const email = emailInput.value;

        const data = {
            email_address: email,
            status: "subscribed"
        };

        fetch(mailchimpAPIEndpoint, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`anystring:${apiKey}`)}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 'subscribed') {
                statusMessage.innerHTML = "Subscribed successfully!";
                emailInput.value = "";
            } else {
                statusMessage.innerHTML = "Subscription failed. Please try again.";
            }
        })
        .catch((error) => {
            console.error(error);
            statusMessage.innerHTML = "Subscription failed. Please try again.";
        });
    });
});
