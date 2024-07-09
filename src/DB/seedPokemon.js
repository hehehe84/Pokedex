import { PrismaClient } from '@prisma/client';
import pokemons from './mock-pokemon';

const prisma = new PrismaClient();

const seedDb = async () => {
    try {
        await prisma.pokemon.deleteMany(); // Clear existing data
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
    } finally {
        await prisma.$disconnect();
    }
};

seedDb().catch((error) => {
    console.error('Error seeding database:', error);
});
