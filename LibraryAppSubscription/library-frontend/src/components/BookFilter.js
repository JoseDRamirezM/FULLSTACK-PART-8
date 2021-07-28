
import React from 'react'

const BookFilter = ({ filter, setFilter, genreList }) => {

    const handleChange = async (event) => {
        await setFilter(event.target.value)  
    }

    return (
        <div>
            <h3>filter by</h3>
            <select
                value={filter}
                onChange={handleChange}                    
            >
                {genreList.map((genre, index) =>
                    <option key={index} value={genre}>{genre}</option>
                )}
            </select>                    
        </div>
    )


}

export default BookFilter

