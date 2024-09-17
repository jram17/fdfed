const env_variables = require("../utils/envutils");

const useUserHook = async (username) => {
    try {
        const response = await fetch(`https://avatars.abstractapi.com/v1/?api_key=${env_variables.USER_AVATAR_API_KEY}&name=${username}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = useUserHook;
