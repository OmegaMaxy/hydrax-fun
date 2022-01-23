import useSWR from 'swr'

import {
  Container,
  Box,
  Heading,
} from '@chakra-ui/react'

const Joke = () => {
  return (
    <>
      <Container>

      </Container>
      </>
  )
}

function getdata() {
  const {data, error} = useSWR('https://icanhazdadjoke.com', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>Joke({data.id}): {data.joke}</div>
}
export default Joke
