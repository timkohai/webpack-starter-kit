let data = {}

function setData(key, payload) {
    return data[key] = payload
}

function getData(key) {
    return data[key]
}


function getStore() {
    return data
}

export default {
    setData,
    getData,
    data: data,
    getStore
}