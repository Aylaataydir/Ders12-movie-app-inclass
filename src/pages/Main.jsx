import React, { useContext, useState } from 'react'
import { MovieKontext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {

  const { movies, loading, getMovies } = useContext(MovieKontext)
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    getMovies(SEARCH_API + query)

  }
 
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center p-2" >
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2 bg-gray-300  "
          placeholder="Search a movie..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className='flex justify-center flex-wrap'>
        {loading
          ?
          (<div>
            <span>yükleniyor...</span>
          </div>)
          :
          (movies?.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          )))
        }


      </div>
    </div>
  )
}

export default Main