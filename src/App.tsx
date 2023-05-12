import './App.css'
import { useQuery, useQueries } from 'react-query'
import { useEffect, useState } from 'react'
import WithoutReactQuery from './WithoutReactQuery'
import BasicReactQuery from './BasicReactQuery'
// https://pokeapi.co/api/v2/pokemon/1/
const fetchPokemon = async ({ queryKey }: any) => {
  console.log(queryKey)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}/`)
  const data = await res.json()
  return data
}
const timeToDate = (time: number) => {
  const date = new Date(time)
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const pokemonIdArray = [1, 2, 3, 4, 5]

function App () {
  const [page, setPage] = useState(1)
  const pokemonsQuery = useQueries(
    pokemonIdArray.map((id) => {
      return {
        queryKey: ['pokemon', id],
        queryFn: fetchPokemon,
        enabled: false
      }
    })
  )
  const { data, isLoading, isError, error, dataUpdatedAt } =
  useQuery(['pokemon', page], fetchPokemon, {
    refetchOnWindowFocus: false
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <div className="App">
      <h3>Data update at : {timeToDate(dataUpdatedAt)}</h3>
      <div className=' w-full flex justify-center '>
        <BasicReactQuery/>
      {/* <div className=' border  p-2'>
        <p > No.00{data.id} {data.name}</p>
        <div className=' w-full flex justify-between'>
          <button onClick={() => { setPage((currentState) => currentState > 1 ? currentState - 1 : currentState) }
          } className=' bg-gray-500 px-1 cursor-pointer' >Prev</button>
          <button onClick={
            () => {
              setPage(
                (currentState) => currentState < 898 ? currentState + 1 : currentState
              )
            }
          } className=' bg-gray-500 px-1 cursor-pointer' >Next</button>
        </div>
        <img src={data?.sprites?.front_default}/>
        <div className=' flex gap-1'>
        {data?.types?.map((type) => (
          <p className=' bg-green-300' key={type.type.name}>{type.type.name}</p>
        ))}
        </div>
      </div> */}
      </div>
    </div>
  )
}

export default App
