import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import dates from '../utility/dates'
import { Link } from 'react-router-dom'
import '../css/Event.css'

const Event = (props) => {
    
    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [props.id]) // Added props.id as dependency for safety

    useEffect(() => {
        if (event.event_time) {
            (async () => {
                const result = await dates.formatTime(event.event_time)
                setTime(result)
            }) ()
        }
    }, [event])

    useEffect(() => {
        if (event.remaining) {
            (async () => {
                const timeRemaining = await dates.formatRemainingTime(event.remaining)
                setRemaining(timeRemaining)
                // Removed the manual formatNegativeTimeRemaining call
            }) ()
        }
    }, [event])

    // Minimum change: Determine the class based on the state
    const isPassed = remaining === "Event passed";

    return (
        /* The React Way: Conditionally add the 'event-passed' class */
        <article className={`event-information ${isPassed ? 'event-passed' : ''}`}>
            {isPassed && <div className="passed-badge">PASSED</div>}
            
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3 style={{ textTransform: 'capitalize' }}>{event.title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i>
                        { dates.formatDate(event.event_date)} <br /> {time}
                    </p>
                    <p className={isPassed ? 'status-red' : ''}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event