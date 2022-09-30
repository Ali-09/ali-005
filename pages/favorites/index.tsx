import { Grid } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { Layout } from '../../components/layouts';
import { NotFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemon } from "../../components/pokemons";

const Favorites = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);
  

  return (
    <Layout title="Pokémon - Favorites">
      {
        favoritePokemons?.length === 0 ?
          (<NotFavorites />)
        : (<FavoritePokemon pokemons={favoritePokemons}/>)

      }
    </Layout>
  )
}

export default Favorites;