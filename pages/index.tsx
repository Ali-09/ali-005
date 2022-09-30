import type { NextPage } from 'next'
import { Layout } from '../components/layouts';
import { GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemons';

interface Props{
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokedex">
      <Grid.Container gap={ 2 } justify="flex-start">
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
  })) 

  return {
      props: {
        pokemons
      }
  }
}

export default Home
