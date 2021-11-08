import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export function useEmissions(bilan) {
  return useQuery(['emissions', bilan], () =>
    axios.get(`${apiUrl}/bilans/${bilan}/emissions`).then((res) =>
      res.data.map((emission) => ({
        ...emission,
        resultat: emission.valeur * 2,
      }))
    )
  )
}
export function useEmissionsCreation() {
  const queryClient = useQueryClient()
  return useMutation(
    (emission) => axios.post(`${apiUrl}/emissions/`, emission),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['emissions'])
      },
    }
  )
}
export function useEmissionsMutation(id) {
  const queryClient = useQueryClient()
  return useMutation(
    (emission) => axios.patch(`${apiUrl}/emissions/${id}`, emission),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['emissions'])
      },
    }
  )
}
export function useEmissionsDeletion(id) {
  const queryClient = useQueryClient()
  return useMutation(() => axios.delete(`${apiUrl}/emissions/${id}`), {
    onSettled: () => {
      queryClient.invalidateQueries(['emissions'])
    },
  })
}
