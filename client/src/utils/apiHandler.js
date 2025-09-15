const handleApiRequest = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data?.result;
    } catch (error) {
        // Normalize error response
        let message = "Something went wrong!";
        if (error.response) {
            // Server responded with a status other than 2xx
            message = error.response.data?.message || error.response.statusText;
        } else if (error.request) {
            // Request made but no response received
            message = "No response from server.";
        } else {
            // Something went wrong setting up the request
            message = error.message;
        }

        return message;
    }
};
export default handleApiRequest;