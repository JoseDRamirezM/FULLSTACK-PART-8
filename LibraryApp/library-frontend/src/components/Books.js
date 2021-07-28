import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'
import BookFilter from './BookFilter'

const Books = (props) => {

  let books

  let allGenres

  const [filter, setFilter] = useState('all')

  const result = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: filter === 'all' ? '' : filter }
  }) 

  const genresList = useQuery(ALL_BOOKS)

  useEffect(() => {
    result.refetch({ variables: { genre: filter === 'all' ? '' : filter} })    
    genresList.refetch()
  }, [filter])


  if (!props.show) {
    return null
  }

  if (result.loading || genresList.loading) {
    return <div>Loading ...</div>
  }

  books = result.data.allBooks

  allGenres = genresList.data.allBooks

  let genreList = [].concat.apply([], 
    allGenres.map( book => {
        return book.genres
     })).concat('all')
  genreList = [...new Set(genreList)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <BookFilter 
          filter={filter}
          setFilter={setFilter}
          genreList={genreList} 
        />
      </div>
    </div>
  )
}

export default Books