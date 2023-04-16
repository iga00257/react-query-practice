
import { useState, useEffect } from 'react'

// https://pokeapi.co/api/v2/pokemon/1/

const WithoutReactQuery = () => {
  const [data, setData] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    // fetch pokeAPI
    const fetchPokeAPI = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/')
        if (response.status !== 200 && !response.ok) throw new Error('Something went wrong')
        const data = await response.json()
        setData(data)
        setIsSuccess(true)
      } catch (error) {
        console.log(error)
        // setErrorMessage(error.message)
      }
    }
    fetchPokeAPI()
  }, [])

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }
  return (
    <div>
        <h1>React App</h1>
      <div>
        <h2>Fetch Data</h2>
        <div>
          <p>Is Success: {isSuccess ? 'true' : 'false'}</p>
          <p>Response: { isSuccess && JSON.stringify(data)}</p>
    </div>
    </div>
    </div>
  )
}

export default WithoutReactQuery
