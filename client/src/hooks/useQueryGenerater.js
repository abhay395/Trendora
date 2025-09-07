

export const queryGenerater = (options = {}, filter = {}) => {
    let query = ''
    for (let [key, value] of Object.entries({ ...options, ...filter })) {
        if (value != '') query += `${key}=${value}&`
    }
    return query
}