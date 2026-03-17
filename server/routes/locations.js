import express from 'express';
import * as LocationController from '../controllers/locations.js'
// import { getLocation } from '../controllers/locations.js';

const router = express.Router()
router.get('/',LocationController.getAllLocations)
router.get('/:slug', LocationController.getLocation );


export default router