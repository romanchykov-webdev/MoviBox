import axios from 'axios';
import {apiKey} from "../constants"

//endpoint
const apiBaseUrl = `https://api.themoviedb.org/3`
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoint
export const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
export const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
export const movieSimilarEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// search movies
export const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// personDetailsEndpoint
export const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
export const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// get images
export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;
// get images


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data

    } catch (error) {
        console.log("error", error);
        return {}
    }
}

// get trending movies
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}

// get Upcoming Movies
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}

// get Top Rated Movies
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

//dynamic api MovieDetails
export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

//dynamic api MovieCredits
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}

//dynamic api MovieSimilar
export const fetchMovieSimilar = id => {
    return apiCall(movieSimilarEndpoint(id))
}

// get person details
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}

// get Person Movies
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

// search movie
export const searchMovies = params => {
    return apiCall(searchMovieEndpoint, params)
}





















