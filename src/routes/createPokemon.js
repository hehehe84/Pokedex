const {PrismaClient} =  require("@prisma/client");
const validPokemonCreate = require('../services/pokemonService');
const auth = require('../auth/auth');

const prisma = new PrismaClient();

const createPokemon = (app) => {
    app.post('/api/pokemons', auth, async (req, res) => {  
        try {

            const validatedData = await validPokemonCreate({
                name: req.body.name,
                hp: req.body.hp,
                cp: req.body.cp,
                picture: req.body.picture,
                types: req.body.types,
            });

            const pokemon = await prisma.pokemon.create({
                data: validatedData,
            });
            const message = `Le pokémon ${req.body.name} a été obtenu`;
            res.json({ message, data: pokemon });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientValidationError) {
                const message = `Validation Error`;
                res.status(400).json({ message, data: error });
            } if (error instanceof Error) { //Zod validation error still buggy when create
                const message = `Validation error: ${error}`;
                res.status(400).json({ message, data: error});
            } else {
                const message = `Une erreur s'est produite lors de la récupération des pokémons.`;
                res.status(500).json({ message, data: error });
            }
        }
    });
};

module.exports = createPokemon;