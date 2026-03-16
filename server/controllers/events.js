import { pool } from '../config/database.js'

export const  getEvents = async( req, res )=>{
    try{
       const results = await pool.query('SELECT * FROM events ORDER BY id ASC')      
        res.status( 200 ).json( results.rows)
    }catch(error){
        console.log( res.status(409).json({ error: error.message }))
    }
}


export const getEvent = async (req, res) => {
    // This must match the name in the router (eventId)
    const id = req.params.id; 
    
    try {
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        
        if (results.rows.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};