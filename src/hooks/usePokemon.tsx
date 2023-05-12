import { useMutation, useQuery, useQueryClient } from 'react-query'

export interface Data {
  id?: string
  name?: string
  description?: string
  created_on?: string
  last_modified?: string
}

export function useCreate () {
  // create dataset
  const queryClient = useQueryClient()
  const createPokemonMutation = useMutation(async (newData: Data) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'POST',
      body: JSON.stringify({ name: newData.name, description: newData.description }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to delete dataset group')
    }
  }, {
    onSuccess: () => {
      // 更新 `datasetGroups` query，讓 UI 重新 render
      void queryClient.invalidateQueries('datasetGroups')
    }
  }
  )
  const createDatasetGroup = async (newData: Data) => {
    await createPokemonMutation.mutateAsync(newData)
  }
  return createDatasetGroup
}

export function useDelete () {
  const queryClient = useQueryClient()

  const deletePokemonMutation = useMutation<string, Error, string>(async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete dataset group')
    }
    return id
  }, {
    onSuccess: (deleteId) => {
      queryClient.removeQueries(['pokemondata', deleteId])
      // 更新 `datasetGroups` query，讓 UI 重新 render
      void queryClient.invalidateQueries('datasetGroups')
    }
  })

  const deletePokemon = async (id: string) => {
    return await deletePokemonMutation.mutateAsync(id)
  }

  return deletePokemon
}

function usePokemon (page: string | number) {
  const fetchPokemon = async ({ queryKey }: any) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}/`)
    const data = await res.json()
    return data
  }

  const { data, isLoading, isError, error, refetch } = useQuery(['pokemondata', page], fetchPokemon)

  return { data, isLoading, isError, error, refetch }
}

export default usePokemon
