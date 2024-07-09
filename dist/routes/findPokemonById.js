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
const findPokemonById = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const pokemon = yield prisma.pokemon.findUnique({
                where: { id: id },
            });
            if (pokemon === null) {
                const message = "The pokemon asked does not exist. Try again with another id.";
                return res.status(404).json({ message });
            }
            const message = `The Pokemon ${pokemon.name} was found.`;
            res.json({ message, data: pokemon });
        }
        catch (error) {
            const message = `An error occurred. Try again another time.`;
            res.status(500).json({ message, data: error });
        }
    }));
};
exports.default = findPokemonById;
