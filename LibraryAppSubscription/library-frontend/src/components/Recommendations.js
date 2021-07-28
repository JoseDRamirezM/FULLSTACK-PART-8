import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {

  const result = useQuery(ALL_BOOKS_BY_GENRE, {
      variables: { genre: props.user ? props.user.favoriteGenre : '' }
  })

  if (!props.show || !props.user) {
    return null
  }

  if (result.loading) {
    return <div>Loading ...</div>
  }

  let books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{props.user.favoriteGenre ? props.user.favoriteGenre : null}</strong></p>
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
    </div>
  )
}

export default Recommendations