import { Express } from 'express';
import findManyPokemon from './findAllPokemons';
import createPokemon from './createPokemon';
import deletePokemon from './deletePokemons';
import findPokemonById from './findPokemonById';
import updatePokemon from './updatePokemon';
import login from './login';
import Register from './register';

export default (app: Express): void => {
    findManyPokemon(app);
    createPokemon(app);
    deletePokemon(app);
    findPokemonById(app);
    updatePokemon(app);
    login(app);
    Register(app);
};
