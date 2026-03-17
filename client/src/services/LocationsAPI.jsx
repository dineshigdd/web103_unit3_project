
// src/services/LocationsAPI.js
const URL = '/api/locations';

const LocationsAPI = {
    // Map the index from App.js to your backend static routes
    getAllLocations:async ()=>{
        try {
            const response = await fetch(`${URL}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching location events:", error);
            return [];
        }
    },
    getLocation: async (index) => {
        let slug = '';
        console.log(index)
        switch(index) {
            case 1: slug = 'echolounge'; break;
            case 2: slug = 'houseofblues'; break;
            case 3: slug = 'pavilion'; break;
            case 4: slug = 'americanairlines'; break;
            default: slug = '';
        }

        try {
            const response = await fetch(`${URL}/${slug}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching location events:", error);
            return [];
        }
    }
};

export default LocationsAPI;