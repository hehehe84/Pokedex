"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findAllPokemons_1 = require("./findAllPokemons");
const createPokemon_1 = require("./createPokemon");
const deletePokemons_1 = require("./deletePokemons");
const findPokemonById_1 = require("./findPokemonById");
const updatePokemon_1 = require("./updatePokemon");
const login_1 = require("./login");
const register_1 = require("./register");
exports.default = (app) => {
    (0, findAllPokemons_1.default)(app);
    (0, createPokemon_1.default)(app);
    (0, deletePokemons_1.default)(app);
    (0, findPokemonById_1.default)(app);
    (0, updatePokemon_1.default)(app);
    (0, login_1.default)(app);
    (0, register_1.default)(app);
};
