// controllers/locations.js
import { pool } from '../config/database.js';


// GET ALL: Used for the map/home page
export const getAllLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT id,name,slug FROM locations ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getLocation = async (req, res) => {
    try {
        const { slug } = req.params;

        const query = `
            SELECT 
                locations.name, 
                locations.address, 
                locations.city, 
                locations.state, 
                locations.zip, 
                locations.image AS location_image, -- Alias 1
                events.id,
                events.title, 
                events.event_date, 
                events.event_time, 
                events.image AS event_image     -- Alias 2 (Very Important!)
            FROM locations
            LEFT JOIN events ON LOWER(locations.name) = LOWER(events.venue)
            WHERE locations.slug = $1
        `;

        const { rows } = await pool.query(query, [slug]); // Destructure 'rows' here

        if (rows.length === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        const response = {
            location: {
                name: rows[0].name,
                address: rows[0].address,
                image: rows[0].location_image,
                city: rows[0].city,
                state: rows[0].state,
                zip: rows[0].zip
            },
            // Check rows[0].id to see if there's actually an event joined
            events: rows[0].id ? rows.map(r => ({
                id: r.id,
                title: r.title,
                date: r.event_date, // Match the SQL column name
                time: r.event_time, // Match the SQL column name
                image: r.event_image // Match the alias from the SQL
            })) : []
        };

        // Only one response call!
        return res.status(200).json(response);

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};