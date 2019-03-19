import axios from 'axios'

export default {
  getMovie1: () => axios.get(`https://www.omdbapi.com/?t=sky&apikey=${process.env.MOVIES_API_KEY}`),
  getMovie2: () => axios.get(`https://www.omdbapi.com/?t=flow&apikey=${process.env.MOVIES_API_KEY}`),
  getMovie3: () => axios.get(`https://www.omdbapi.com/?t=darkness&apikey=${process.env.MOVIES_API_KEY}`),
}
