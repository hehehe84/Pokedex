"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pokemonService_1 = require("../services/pokemonService");
const auth = require('../auth/auth');
const prisma = new client_1.PrismaClient();
const updatePokemon = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const validatedData = yield (0, pokemonService_1.validPokemonUpdate)(id, {
                name: req.body.name,
                hp: req.body.hp,
                cp: req.body.cp,
                picture: req.body.picture,
                types: req.body.types,
            });
            const updatePokemon = yield prisma.pokemon.update({
                where: { id: id },
                data: validatedData,
            });
            const pokemon = yield prisma.pokemon.findUnique({
                where: { id: id },
            });
            if (pokemon == null) {
                const message = "The pokemon does not exist. Try with another id.";
                return res.status(400).json({ message });
            }
            const message = `The pokemon ${pokemon.name} was correctly updated to ${updatePokemon.name}`;
            res.json({ message, data: pokemon });
        }
        catch (error) {
            if (error.code == "P2002") {
                const message = 'Unique constraint violation';
                return res.status(400).json({ message, data: error });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "The Pokemon couldn't be found. Try again another time.";
            res.status(500).json({ message, data: error });
        }
    }));
};
exports.default = updatePokemon;
