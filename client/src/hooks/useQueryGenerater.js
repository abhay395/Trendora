

export const queryGenerater = (options = {}, filter = {}) => {
    let query = ''
    for (let [key, value] of Object.entries({ ...options, ...filter })) {
        query += `${key}=${value}&`
    }
    return query
}