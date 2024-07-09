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
const createPokemon = (app) => {
    app.post('/api/pokemons', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validatedData = yield (0, pokemonService_1.validPokemonCreate)({
                name: req.body.name,
                hp: req.body.hp,
                cp: req.body.cp,
                picture: req.body.picture,
                types: req.body.types,
            });
            const pokemon = yield prisma.pokemon.create({
                data: validatedData,
            });
            const message = `Le pokémon ${req.body.name} a été obtenu`;
            res.json({ message, data: pokemon });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientValidationError) {
                const message = `Validation Error`;
                res.status(400).json({ message, data: error });
            }
            if (error instanceof Error) { //Zod validation error still buggy when create
                const message = `Validation error: ${error}`;
                res.status(400).json({ message, data: error });
            }
            else {
                const message = `Une erreur s'est produite lors de la récupération des pokémons.`;
                res.status(500).json({ message, data: error });
            }
        }
    }));
};
exports.default = createPokemon;
