import axios from 'axios'

export default (() => {

    const getInstance = url => {

        const instance = axios.create({
            headers: {
                'Accept-Language': 'en-US',
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors'
            }
        })
        
        instance.defaults.baseURL = url
        return instance
    }

    return {
        getInstance: url => getInstance(url)
    }
})()