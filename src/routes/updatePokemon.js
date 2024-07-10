const prisma = require('../DB/dbClient');
const validPokemonUpdate = require("../services/pokemonService");
const auth = require('../auth/auth');

const updatePokemon = (app) => {
    app.put('/api/pokemons/:id', auth, async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            const validatedData = await validPokemonUpdate(id, {
                name: req.body.name,
                hp: req.body.hp,
                cp: req.body.cp,
                picture: req.body.picture,
                types: req.body.types,
            });

            const updatePokemon = await prisma.pokemon.update({
                where: {id: id},
                data: validatedData,
            });

            const pokemon = await prisma.pokemon.findUnique({
                where: {id: id},
            });

            if (pokemon == null) {
                const message = "The pokemon does not exist. Try with another id.";
                return res.status(400).json({message});
            }

            const message = `The pokemon ${pokemon.name} was correctly updated to ${updatePokemon.name}`;
            res.json({message, data: pokemon});

        } catch (error) {
            if (error.code == "P2002"){
                const message = 'Unique constraint violation';
                return res.status(400).json({ message, data: error });
            }
            if (error instanceof Error){
                return res.status(400).json({ message: error.message, data: error });
            }

            const message = "The Pokemon couldn't be found. Try again another time.";
            res.status(500).json({ message, data:error });
        }
    })
}

module.exports = updatePokemon;