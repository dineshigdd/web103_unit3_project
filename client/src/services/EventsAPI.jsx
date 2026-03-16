const API_URL = '/api/events' 

const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        return data
    } catch (error) {
        console.error("Error fetching events:", error)
        throw error 
    }
}

const getEventsById = async (id) => {
    try {
        // This will resolve to /api/1, /api/2, etc.
        const response = await fetch(`${API_URL}/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching event with id ${id}:`, error)
        throw error
    }
}

export default {
    getAllEvents,
    getEventsById
}