const prisma = require('../DB/dbClient');
const pokemons = require('./mock-pokemon');

const seedDb = async () => {
    try {
        await prisma.pokemon.deleteMany(); // Clear existing data
        // await prisma.$executeRaw`TRUNCATE TABLE "Pokemon" RESTART IDENTITY;`;
        for (const pokemon of pokemons) {
            await prisma.pokemon.create({
                data: {
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: { set: pokemon.types }, 
                    created_at: pokemon.created
                }
            });
        }
        console.log('Database successfully seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = seedDb;
