import axios from 'axios'

export default {
  get1: () => axios.get(`http://www.omdbapi.com/?t=sky&apikey=${process.env.MOVIES_API_KEY}`),
  get2: () => axios.get(`http://www.omdbapi.com/?t=flow&apikey=${process.env.MOVIES_API_KEY}`),
  get3: () => axios.get(`http://www.omdbapi.com/?t=darkness&apikey=${process.env.MOVIES_API_KEY}`),
}
