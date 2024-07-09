const findManyPokemon = require('./findAllPokemons');
const createPokemon = require('./createPokemon');
const deletePokemon = require('./deletePokemons');
const findPokemonById = require('./findPokemonById');
const updatePokemon = require('./updatePokemon');
const login = require('./login');
const Register = require('./register');

export default (app) => {
    findManyPokemon(app);
    createPokemon(app);
    deletePokemon(app);
    findPokemonById(app);
    updatePokemon(app);
    login(app);
    Register(app);
};
