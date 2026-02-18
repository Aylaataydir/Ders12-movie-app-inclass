import React, { useContext } from 'react'
import { AuthKontext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ id, title, overview, poster_path, vote_average }) => {

  const { currentUser } = useContext(AuthKontext)
  const navigate = useNavigate()

  return (
    <div 
    onClick={() => navigate("details/"+id) }
    id='container' className='movie'>
      <img src={`https://image.tmdb.org/t/p/w1280${poster_path}`} alt="" />
      <div className='flex align-baseline justify-between p-1 text-white'>
        <h5>{title}</h5>
        {currentUser &&
          (<span className={`tag ${vote_average > 7 ? "green" : vote_average > 5 ? "orange" : "red"}`}>{vote_average.toFixed(1)}</span>)
        }

      </div>

      <div>
        <div className='movie-over'>
          <h2>overview</h2>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard