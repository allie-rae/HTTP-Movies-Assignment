import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UpdateMovie(props) {
    const [updatedMovie, setUpdatedMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const [stars, setStars] = useState('')

    useEffect(() => {
        axios.create({
            baseURL: 'http://localhost:5000/api'
        })
            .get(`movies/${props.match.params.id}`)
            .then(res => {
                setUpdatedMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handlechanges = (e) => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleStarChanges = e => {
        setStars(e.target.value)
    }

    const submitMovie = (e) => {
        e.preventDefault();
        axios.create({
            baseURL: 'http://localhost:5000/api'
        })
            .put(`/movies/${updatedMovie.id}`, updatedMovie)
        props.history.push('/')
    }


    return (
        <form onSubmit={submitMovie}>
            <input
                name="title"
                value={updatedMovie.title}
                placeholder="Title"
                onChange={handlechanges}
            />
            <input
                name="director"
                value={updatedMovie.director}
                placeholder="Director"
                onChange={handlechanges}
            />
            <input
                name="metascore"
                value={updatedMovie.metascore}
                placeholder="Metascore"
                onChange={handlechanges}
            />
            <input
                name="stars"
                value={stars}
                placeholder="Add Stars"
                onChange={handleStarChanges}
            />
            <button 
            type="button"
            onClick={e => {
                e.preventDefault();
                setUpdatedMovie({
                    ...updatedMovie, stars: [...updatedMovie.stars, stars]
                })
                setStars('')
            }}>Add Star</button>
            <button type="submit">Submit Changes</button>
        </form>
    )
}