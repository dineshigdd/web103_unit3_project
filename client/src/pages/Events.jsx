import React, { useState, useEffect } from 'react';
import EventsAPI from '../services/EventsAPI';
import LocationsAPI from '../services/LocationsAPI';
import Event from '../components/Event';
import LocationDropdown from '../components/LocationDropdown';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    //Load locations (once)
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await LocationsAPI.getAllLocations();
                setLocations(data);
            } catch (error) {
                console.error("Failed to load locations:", error);
            }
        };

        fetchLocations();
    }, []);

    //Fetch events based on selected location
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let data;

                if (selectedLocation === '') {
                    // Get all events
                    data = await EventsAPI.getAllEvents();
                    setEvents(data);
                } else {
                    // Get events by location
                    const locationData = await LocationsAPI.getLocation(Number(selectedLocation));

                    if (locationData && locationData.events) {
                        setEvents(locationData.events);
                    } else {
                        setEvents([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
            }
        };

        fetchEvents();
    }, [selectedLocation]);

    
    const handleLocationChange = (value) => {        
        setSelectedLocation(value);
    };

    return (
        <div className="events-page">
            <div className="events-container">
                <h1>All Music Events</h1>

                <LocationDropdown
                    locations={locations}
                    selectedLocation={selectedLocation}
                    onLocationChange={handleLocationChange}
                />

                <div className="events-grid">
                    {events && events.length > 0 ? (
                        events.map((event) => (
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                date={event.event_date}
                                time={event.event_time}
                                image={event.image}
                            />
                        ))
                    ) : (
                        <p>No events found for this selection.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;