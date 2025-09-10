

export const queryGenerater = (options = {}, filter = {}) => {
    const params = new URLSearchParams();

    // merge both objects and iterate
    Object.entries({ ...options, ...filter }).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            params.append(key, value);
        }
    });

    const query = params.toString();
    return query ? `?${query}` : "";
};
