import fetch from 'node-fetch';

async function getToken() {
    const authTokenUrl = "http://20.244.56.144/test/auth";
    const authPayload = {
        companyName: "Affordmed",
        clientID: "b0772842-7a18-457b-84e1-7796d562f737",
        clientSecret: "EDOPYDKzlrsLqjhW",
        ownerName: "Vanshika Raj",
        ownerEmail: "vanshi18@gmail.com",
        rollNo: "21051444"
    };

    try {
        const response = await fetch(authTokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer your_access_token_here"
            },
            body: JSON.stringify(authPayload)
        });

        if (response.ok) {
            const authTokenDetails = await response.json();
            const accessToken = authTokenDetails.access_token;
            console.log("Authorization successful!");
            return accessToken;
        } else {
            const errorMessage = await response.text();
            throw new Error(`Authorization failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

(async () => {
    try {
        const accessToken = await getToken();
        console.log("Access Token:", accessToken);
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
