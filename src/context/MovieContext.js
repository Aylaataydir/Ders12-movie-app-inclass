import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"
import { toastError } from '../helpers/ToastNotify'


export const MovieKontext = createContext()


const MovieContext = ({ children }) => {

  const [movies, setMovies] = useState()
  const [loading, setLoading] = useState(false)


  const API_KEY = process.env.REACT_APP_TMDB_KEY
  const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`



  const getMovies = async (url) => {

    try {

      setLoading(true)

      const { data } = await axios(url)
      setMovies(data.results)

    } catch (error) {
      toastError(error)

    }
      setLoading(false)
    
  }

  useEffect(() => {
    getMovies(BASE_URL)

  }, [BASE_URL])



  return (
    <MovieKontext.Provider value={{movies, loading, getMovies}}>
      {children}
    </MovieKontext.Provider>
  )
}

export default MovieContext