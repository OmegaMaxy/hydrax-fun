import useSWR from 'swr'
import React from 'react'

import {
  Container,
  Heading,
} from '@chakra-ui/react'


export default function Joke() {
  const headers = {
    'Accept': 'application/json'
  }
  const fetcher = (...args) => fetch(...args, { headers }).then((res) => res.json())
  const {data, error} = useSWR('https://icanhazdadjoke.com', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <section>
      <h1 title={data.id}>{data.joke}</h1>

      <style jsx>{`
        section {
          padding: 3rem;
          margin-top: 2rem;
        }
        h1 {
          font-size: 2em;
          text-align: center;
        }
      `}</style>
    </section>
  )
}
