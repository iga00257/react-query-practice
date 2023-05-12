import { useQuery } from 'react-query'
import { useState } from 'react'
const fetchPokemon = async ({ queryKey }: any) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}/`)
  const data = await res.json()
  return data
}

export default function BasicReactQuery () {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } =
    useQuery(['pokemon', page], fetchPokemon, {
      refetchOnWindowFocus: false
    })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{(error as Error).message}</div>
  }
  return (
        <div className=' border  p-2'>
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
        {data?.types?.map((type: { type: { name: string } }) => (
          <p className=' bg-green-300' key={type.type.name}>{type.type.name}</p>
        ))}
        </div>
      </div>
  )
}
