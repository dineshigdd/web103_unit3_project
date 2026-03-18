import React from 'react';

const LocationDropdown = ({ locations, selectedLocation, onLocationChange }) => {
    return (
        <div className='filter-section'>
            <label htmlFor="location-select">Filter by Venue: </label>
            <select
                id="location-select"
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
            >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                    <option key={loc.id} value={loc.id} style={{ textTransform: 'capitalize' }}>
                        {loc.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationDropdown;