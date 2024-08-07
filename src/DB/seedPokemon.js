const prisma = require('../DB/dbClient');
const pokemons = require('./mock-pokemon');

const seedDbPok = async () => {
    try {
        // await prisma.pokemon.deleteMany(); // Clear existing data TO COMMENT WHEN DEPLOYMENT
        for (const pokemon of pokemons) {
            await prisma.pokemon.create({
                data: {
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                    created_at: pokemon.created
                }
            });
        }
        console.log('Pokemon Database successfully seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
seedDbPok();

// Exporting the seedDbPok function
module.exports = seedDbPok;