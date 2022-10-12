const getJsonStrError= (error) => {
    let key = Object.keys(error)[0]
    let str = error[key]
    if (Array.isArray(str)) {
        str = str[0]
    }

    return `${key[0].toUpperCase()}${key.slice(1)} : ${str}`
}

export default getJsonStrError