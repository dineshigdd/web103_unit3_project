import { pool } from './database.js';
// import dotenv from './dotenv.js'; 
import events from '../data/events.js';
import locations from '../data/locations.js';


const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE, -- Added this for clean URLs
            address VARCHAR(255),
            city VARCHAR(100),
            state VARCHAR(50),
            zip VARCHAR(20),
            image VARCHAR(255)
        );

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
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

const seedDatabase = async () => {
    await createTables();

    // 2. Insert Locations
    for (const location of locations) {
        const insertLocationQuery = {
            text: 'INSERT INTO locations (name, slug, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [
                location.name,    // $1
                location.slug,    // $2 
                location.address, // $3
                location.city,    // $4
                location.state,   // $5
                location.zip,     // $6
                location.image    // $7
            ]
        };
        try {
            await pool.query(insertLocationQuery);
            console.log(`Location "${location.name}" inserted`);
        } catch (err) {
            console.error(`Error inserting location ${location.name}:`, err);
        }
    }

    // 3. Insert Events
    for (const event of events) {
        const insertEventQuery = {
            text: 'INSERT INTO events (title, artists, event_date, event_time, remaining, venue, genre, ticket_price, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [
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
        };
        try {
            await pool.query(insertEventQuery);
            console.log(`Event "${event.title}" inserted`);
        } catch (err) {
            console.error(`Error inserting event ${event.title}:`, err);
        }
    }
};

seedDatabase();