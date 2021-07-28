import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_GENRE, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      try {
        //update cache for book list
        const dataInStore = store.readQuery({ query: ALL_BOOKS_BY_GENRE , variables: { genre: ''} })
        console.log(dataInStore);
        store.writeQuery({
          query: ALL_BOOKS_BY_GENRE,
          variables: { genre: ''},
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, response.data.addBook]
          }
        })
        //update cache for author list
        const dataInStore2 = store.readQuery({ query: ALL_AUTHORS })
        store.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...dataInStore2,
            allAuthors: [...dataInStore2.allAuthors, response.data.addBook.author]
          }
        })
        //update cache for all books i.e updates genres list
        const dataInStore3 = store.readQuery({ query: ALL_BOOKS })
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...dataInStore3,
            allBooks: [...dataInStore3.allBooks, response.data.addBook]
          }
        })
      }
       catch (error) {
        console.log(error.message)
      }
      
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    createBook({ variables: { title, published: parseInt(published), author, genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook