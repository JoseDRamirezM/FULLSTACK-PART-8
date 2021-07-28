import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from '../queries'

const SetAuthorsAge = ({ authors }) => {
    
    const [born, setBorn] = useState('')   
    const [selectedAuthor, setSelectedAuthor] = useState(authors[0].name)

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ 
            { query: ALL_AUTHORS }, 
            { query: ALL_BOOKS} 
        ],
    })

    const submit = async (event) => {
        event.preventDefault()

        console.log('Updating author')
        updateAuthor({ variables: { name: selectedAuthor, born: parseInt(born) } })
        
        setBorn('')
    }

    const handleChange = async (event) => {
        setSelectedAuthor(event.target.value)
        
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    <select
                        value={selectedAuthor}
                        onChange={handleChange}                    
                    >
                        {authors.map((author, index) =>
                            <option key={index} value={author.name}>{author.name}</option>
                        )}
                    </select>                    
                </div>
                <div>
                    born
                    <input 
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default SetAuthorsAge