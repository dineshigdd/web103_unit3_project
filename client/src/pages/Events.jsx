import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event' // The card component

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchAll = async () => {
            const data = await EventsAPI.getAllEvents()
            setEvents(data)
        }
        fetchAll()
    }, [])

    return (
        <div className="events-page">
            <h1>All Community Events</h1>
            <div className="events-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
               
                { events && events.map(event => (
                    <Event 
                        key={event.id}
                        id={event.id}
                        
                    />
                ))}
            </div>
        </div>
    )
}

export default Events