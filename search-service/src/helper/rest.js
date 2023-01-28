const axios = require('axios');


module.exports = ()=>{
    const self = {
        post: async (url, data) => {
            await axios.post(url, data)
        },
        get : async (url) => {
            return await axios.get(url)
        }
    }
    
    return self
}