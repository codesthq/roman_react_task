import client from "./client"

const getAll = () => client.get("/breeds/list/all")

export default {
    getAll
};
