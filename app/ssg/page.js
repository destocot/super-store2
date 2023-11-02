import axios from 'axios'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const headers = {
  'Cache-Control': 'no-cache',
}

const StaticSide = async () => {
  const pokemon = await getPokemon()

  console.log(pokemon)
  return pokemon.map((poke) => {
    return (
      <div key={poke.name}>
        <img src={poke.imgUrl} />
        <p>{poke.name}</p>
        <hr />
      </div>
    )
  })
}

export const getPokemon = async () => {
  const response = await axios.get(url, { headers })

  const promises = response.data.results.map((result) => {
    return axios.get(result.url, { headers })
  })
  const responses = await Promise.all(promises)

  const pokeData = responses.map((r) => {
    return {
      name: r.data.name,
      imgUrl: r.data.sprites.front_default,
    }
  })

  return pokeData
}

export default StaticSide