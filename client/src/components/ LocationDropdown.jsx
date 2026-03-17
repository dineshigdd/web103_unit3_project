import React from 'react'

const LocationDropdown  = () => {
  return (
    <div>
        <label for='event-locations-select'>Choose a location</label>
        <select name='locations' id='location-select'>
            <option value="">--Please chose on option</option>
            <option value="">Texas</option>
            <option value="">LA</option>

        </select>
    </div>
  )
}

export default LocationDropdown