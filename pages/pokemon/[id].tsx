
import { useState, useEffect } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Card, Grid, Text, Button, Container } from "@nextui-org/react";
import Image from "next/image";
import { Layout } from '../../components/layouts/Layout';
import { localFavorites, getPokemonInfo } from "../../utils";
import confetti from "canvas-confetti";

interface Props{
    pokemon: any
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(false);
 
    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    }, [pokemon.id]);
 
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)
        if(isInFavorites) return 
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin:{
                x: 1,
                y: 0
            }
        });
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: "5px" }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card isHoverable css={{ padding: "30px" }}>
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={ pokemon.name }
                                width="100%"
                                height="200px"
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: "flex", justifyContent: "space-between"}}>
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button color="gradient" onClick={onToggleFavorite} ghost={!isInFavorites}>
                                {
                                    isInFavorites ? "Esta en favoritos" : "Guardar en favoritos"
                                }
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction="row" display="flex" gap={ 0 }>
                                <Image 
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemons151 = [...Array(151)].map(( _, index ) => `${ index + 1 }`)

    return {
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    return {
        props: {
            pokemon: await getPokemonInfo(id)
        }
    };
}

export default PokemonPage;
