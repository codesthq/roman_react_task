import client from "./client"

const getAll = () => client.get("/breeds/list/all")
const getSingleRandomImage = (endpoint) => client.get(`/breed/${endpoint}/images/random`)

export {
    getAll,
    getSingleRandomImage
};
