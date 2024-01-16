import axios from 'axios'
import process from "process"
import dotenv from 'dotenv'
dotenv.config();

const geoCodeUrl = `https://geocode.maps.co/search?api_key=${process.env.GEOCODE_KEY}&q=`
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
            console.log(err);
            callback("Could not to connnect to weather app.", undefined)
        })
}
export default geocode