import axios from "axios";

/* voy a usar la técnica de tzuzul aunque el agregó un proxy */
/* const URL = ; */
/* const URL = "http://localhost:4000"; */

const instance = axios.create({
    baseURL: "https://workflow-347205.rj.r.appspot.com",
});

const aGet = async (url) => {
    return await instance.get(url, {
        withCredentials: true,
    });
};

const aPost = async (url, data) => {
    return await instance.post(url, data, {
        withCredentials: true,
    });
};

const aPut = async (url, data) => {
    return await instance.put(url, data, {
        withCredentials: true,
    });
};

const aDelete = async (url, data) => {
    return await instance.delete(url, data, {
        withCredentials: true,
    });
};

export default instance;
export { aGet, aPost, aPut, aDelete };
