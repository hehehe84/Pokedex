const PrismaClient = require('@prisma/client');
const z = require('zod');

const prisma = new PrismaClient();

const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

const pokemonSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty.').max(25, 'Name contain between 1 and 25 character.'),
    hp: z.number().int().min(0, 'Life points has to be superior to 0.').max(999, 'Max lifepoints has to be inferior to 1000.'),
    cp: z.number().int().min(0, 'Fight points has to be superior to 0.').max(99, 'Fight points has to be inferior to 100.'),
    picture: z.string().url('Please choose a valid URL for the image.'),
    types: z.array(z.string().refine(type => validTypes.includes(type), {
        message: `The pokemon type has to belong to the following list : ${validTypes}`,
    })).min(1, 'A pokemon must have at least one type.').max(3, 'A pokemon can have maximum 3 types.'),
});

async function validPokemonCreate(data) {
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
}

async function validPokemonUpdate(id, data) {
    const validationResult = pokemonSchema.safeParse(data);
    
    if (!validationResult.success) {
        throw new Error(validationResult.error.errors.map(err => err.message).join(', '));
    }

    const { name, hp, cp, picture, types } = validationResult.data;

    return prisma.pokemon.update({
        where: {id},
        data: {
            name,
            hp,
            cp,
            picture,
            types,
        },
    });
}

export {validPokemonCreate, validPokemonUpdate}