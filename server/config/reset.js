import { pool } from './database.js';
import dotenv from './dotenv.js';
import events from '../data/events.js';


const createEventsTable = async () =>{

        const createTableQuery = `

            DROP TABLE IF EXISTS events;

            DROP TABLE IF EXISTS events;

            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                artists TEXT NOT NULL,
                event_date DATE NOT NULL,
                event_time TIME NOT NULL,
                remaining TIMESTAMP NOT NULL,
                venue VARCHAR(255) NOT NULL,
                genre VARCHAR(100),
                ticket_price INTEGER,
                image VARCHAR(255)
            );
        `

        try {
            const res = await pool.query(createTableQuery)
            console.log('Events table created successfully')
        }catch (err) {
            console.error('Error creating events table:', err)
        }
}


const sendEventsTable = async () => {
    await createEventsTable()

    events.forEach( ( event) => {
    const insertQuery = {
      text: 'INSERT INTO events (title, artists, event_date, event_time, remaining, venue, genre, ticket_price, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
    }
        

    const values = [
        event.title,        
        event.artists,      
        event.event_date,   
        event.event_time,   
        event.remaining,    
        event.venue,        
        event.genre,        
        event.ticket_price, 
        event.image         
   ]
    

    pool.query(insertQuery, values , ( err, res) =>{
      if (err) {
        console.error('Error inserting event:', err)
        return
      }
      console.log(`Event "${event.eventName}" inserted successfully`)
    })



})
}

sendEventsTable();



