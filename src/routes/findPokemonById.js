const prisma = require('../DB/dbClient');
const auth = require('../auth/auth');


const findPokemonById = (app) => {
    app.get('/api/pokemons/:id', auth, async (req, res) => {  
        const id = parseInt(req.params.id);
        try {
            const pokemon = await prisma.pokemon.findUnique({
                where: { id: id },
            });

            if (pokemon === null) {
                const message = "The pokemon asked does not exist. Try again with another id.";
                return res.status(404).json({ message });
            }

            const message = `The Pokemon ${pokemon.name} was found.`;
            res.json({ message, data: pokemon });
        } catch (error) {
            const message = `An error occurred. Try again another time.`;
            res.status(500).json({ message, data: error });
        }
    });
};

module.exports = findPokemonById;