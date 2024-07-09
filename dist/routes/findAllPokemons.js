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
const auth = require('../auth/auth');
const prisma = new client_1.PrismaClient();
const findManyPokemon = (app) => {
    app.get('/api/pokemons', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let pokemons;
            const nameQuery = req.query.name;
            const limitQuery = req.query.limit;
            if (nameQuery && nameQuery.length < 2) {
                const message = 'The research should have at least 2 characters.';
                return res.status(400).json({ message });
            }
            if (nameQuery) {
                const totalCountPromise = prisma.pokemon.count({
                    where: { name: { contains: nameQuery, mode: 'insensitive' } },
                });
                const pokemonsPromise = prisma.pokemon.findMany({
                    where: { name: { contains: nameQuery, mode: 'insensitive' } },
                    take: parseInt(limitQuery) || 5,
                    orderBy: { name: 'asc' },
                });
                const [pokemons, totalCount] = yield Promise.all([pokemonsPromise, totalCountPromise]);
                const message = `Found ${totalCount} Pokémon(s) matching '${nameQuery}'`;
                res.json({ message, data: pokemons });
            }
            else {
                pokemons = yield prisma.pokemon.findMany({
                    orderBy: { name: 'asc' },
                });
                const message = 'La liste des pokémons a été récupérée correctement.';
                res.json({ message, data: pokemons });
            }
        }
        catch (error) {
            const message = `Une erreur s'est produite lors de la récupération des pokémons. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error.message });
        }
    }));
};
exports.default = findManyPokemon;
