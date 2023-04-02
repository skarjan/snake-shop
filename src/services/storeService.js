import axios from 'axios';

const getResponse = () => {
  const request = axios.get(`https://api.dekamarkt.nl/v1/assortmentcache/group/281/104?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
  return request.then(response => {
    return response.data
  })
}

export default { getResponse }