
async function registerCompany() {
    const registerUrl = "http://20.244.56.144/test/register";
    const registerPayload = {
        companyName: "Affordmed",
        ownerName: "Vanshika Raj",
        rollNo: "21051444",
        ownerEmail: "vrajnda18@gmail.com",
        accessCode: "mjPQGJ"
    };

    try {
        const response = await fetch(registerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerPayload)
        });

        if (response.ok) {
            const registrationDetails = await response.json();
            const clientId = registrationDetails.clientID;
            const clientSecret = registrationDetails.clientSecret;
            console.log("Registration successful!");
            return { clientId, clientSecret };
        } else {
            const errorMessage = await response.text();
            throw new Error(`Registration failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error(error);
        throw error; // Propagate the error
    }
}

async function getAuthorizationToken(clientId, clientSecret) {
    const authTokenUrl = "http://20.244.56.144/test/auth";
    const authPayload = {
        companyName: "Affordmed",
        clientID: clientId,
        clientSecret: clientSecret,
        ownerName: "Vanshika Raj",
        ownerEmail: "vrajnda18@gmail.com",
        rollNo: "21051444"
    };

    try {
        const response = await fetch(authTokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authPayload)
        });

        if (response.ok) {
            const authTokenDetails = await response.json();
            const accessToken = authTokenDetails.access_token;
            const expiresIn = authTokenDetails.expires_in;
            const tokenType = authTokenDetails.token_type;
            console.log("Authorization successful!");
            return {accessToken,expiresIn,tokenType};
        } else {
            const errorMessage = await response.text();
            throw new Error(`Authorization failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error(error);
        throw error; // Propagate the error
    }
}

(async () => {
    try {
        const { clientId, clientSecret } = await registerCompany();
        const accessToken = await getAuthorizationToken(clientId, clientSecret);
        const tokenType = await getAuthorizationToken(clientId, clientSecret);
        const expiresIn= await getAuthorizationToken(clientId, clientSecret);
        console.log("Token-Tpye:", tokenType);
        console.log("Access Token:", accessToken);
        console.log("Expires-in:", expiresIn);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();

