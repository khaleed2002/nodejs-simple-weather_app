import axios from "axios"

const forcastUrl = 'https://api.weatherapi.com/v1/current.json?key=c629084e5cdd4c3e8ac124615241301&q='
const forecast = (latitiude, longitude, callback) => {
    axios.get(forcastUrl + latitiude + ',' + longitude)
        .then((response) => {
            if (Object.keys(response.data).length > 0) {
                const { location,current } = response.data
                const data = {
                    location: location?.name,
                    temperature: current?.temp_c,
                    condition: current?.condition?.text,
                    human_feel: current.feelslike_c
                }
                callback(undefined, data)
            } else {
                callback("Error with longitude and/or latitude values.", undefined)
            }

        })
        .catch((err) => {
            callback(err?.response?.data?.error?.message, undefined);
        })
}

export default forecast