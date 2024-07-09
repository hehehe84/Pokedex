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
exports.validPokemonCreate = validPokemonCreate;
exports.validPokemonUpdate = validPokemonUpdate;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];
const pokemonSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name cannot be empty.').max(25, 'Name contain between 1 and 25 character.'),
    hp: zod_1.z.number().int().min(0, 'Life points has to be superior to 0.').max(999, 'Max lifepoints has to be inferior to 1000.'),
    cp: zod_1.z.number().int().min(0, 'Fight points has to be superior to 0.').max(99, 'Fight points has to be inferior to 100.'),
    picture: zod_1.z.string().url('Please choose a valid URL for the image.'),
    types: zod_1.z.array(zod_1.z.string().refine(type => validTypes.includes(type), {
        message: `The pokemon type has to belong to the following list : ${validTypes}`,
    })).min(1, 'A pokemon must have at least one type.').max(3, 'A pokemon can have maximum 3 types.'),
});
function validPokemonCreate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationResult = pokemonSchema.safeParse(data);
        if (!validationResult.success) {
            throw new Error(validationResult.error.errors.map(err => err.message).join(', '));
        }
        const { name, hp, cp, picture, types } = validationResult.data;
        return prisma.pokemon.create({
            data: {
                name,
                hp,
                cp,
                picture,
                types,
            },
        });
    });
}
function validPokemonUpdate(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationResult = pokemonSchema.safeParse(data);
        if (!validationResult.success) {
            throw new Error(validationResult.error.errors.map(err => err.message).join(', '));
        }
        const { name, hp, cp, picture, types } = validationResult.data;
        return prisma.pokemon.update({
            where: { id },
            data: {
                name,
                hp,
                cp,
                picture,
                types,
            },
        });
    });
}
