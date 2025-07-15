'use client'

import axios from 'axios'
import useSWR from 'swr'

export default function useGetRandomPeople() {
  const fetcher = async () => {
    const {
      data: { results },
    } = await axios.get('https://randomuser.me/api/?results=10')
    return results
  }
  const { data, error, mutate, isLoading } = useSWR(`/api/endpoint`, fetcher)
  return {
    randomPeople: data,
    randomPeopleError: error,
    randomPeopleLoading: isLoading,
    mutateRandomPeople: mutate,
  }
}
