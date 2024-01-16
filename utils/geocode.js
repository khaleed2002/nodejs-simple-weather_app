import axios from 'axios'

const geoCodeUrl = 'https://geocode.maps.co/search?api_key=65a2e37c5b7a8868534525jho2c04c2&q='

const geocode = (address, callback) => {
    axios.get(geoCodeUrl + encodeURIComponent(address))
        .then((response) => {
            const geoData = response.data[0]
            if (geoData) {
                const { display_name, lat, lon } = geoData
                callback(undefined, {
                    location: display_name,
                    lat,
                    lon
                })
            } else {
                callback("location is not provided, try another", undefined)
            }
        })
        .catch((err) => {
            callback("Could not to connnect to weather app.", undefined)
        })
}
export default geocode