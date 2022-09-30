import { FC } from "react";
import { Grid } from '@nextui-org/react';
import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

type Props = {
    pokemons: number[];
}

export const FavoritePokemon: FC<Props> = ({ pokemons }) => {
    return (
        <Grid.Container gap={ 2 } direction="row" justify="flex-start">
            {
                pokemons?.map(id => (
                    <FavoriteCardPokemon pokemonId={id} key={id}/>
                ))
            }
        </Grid.Container>
    )
}
