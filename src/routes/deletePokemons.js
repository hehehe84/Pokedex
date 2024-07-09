const {PrismaClient} =  require("@prisma/client");
const auth = require('../auth/auth');

const prisma = new PrismaClient();

const deletePokemon = (app) => {
    app.delete('/api/pokemons/:id', auth, async (req, res) => {  
        const id = parseInt(req.params.id);

        try{
            const pokemon = await prisma.pokemon.findUnique({
                where: {id: id},
            });
            
            if(pokemon == null){
                const message="There is no pokemons corresponding to this id"
                return res.status(404).json({ message });
            };

            await prisma.pokemon.delete({
                where: {id: id},
            });

            const message = `The pokemon with id:${pokemon.id} was correctly deleted.`;
            return res.json({message, data: pokemon});
            
        } catch(error){

            const message= "The pokemon wasn't remove";
            return res.status(500).json({message, data: error})

        }
    });
};

module.exports = deletePokemon;