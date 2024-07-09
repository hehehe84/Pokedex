import { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const auth = require('../auth/auth');

const prisma = new PrismaClient();

const findManyPokemon = (app: Express): void => {
    app.get('/api/pokemons', auth, async (req: Request, res: Response) => {
        try {
            let pokemons;
            const nameQuery = req.query.name as string | undefined;
            const limitQuery = req.query.limit as string | undefined;

            if(nameQuery && nameQuery.length < 2){
                const message ='The research should have at least 2 characters.';
                return res.status(400).json({message})
            }
            
            if (nameQuery) {
                const totalCountPromise = prisma.pokemon.count({
                    where: { name: { contains: nameQuery, mode: 'insensitive' } },
                });

                const pokemonsPromise = prisma.pokemon.findMany({
                    where: { name: { contains: nameQuery, mode: 'insensitive' } },
                    take: parseInt(limitQuery) || 5,
                    orderBy: { name: 'asc' },
                });

                const [pokemons, totalCount] = await Promise.all([pokemonsPromise, totalCountPromise]);

                const message = `Found ${totalCount} Pokémon(s) matching '${nameQuery}'`;
                res.json({ message, data: pokemons });
            } else {
                pokemons = await prisma.pokemon.findMany({
                    orderBy: { name: 'asc' },
                });

                const message = 'La liste des pokémons a été récupérée correctement.';
                res.json({ message, data: pokemons });
            }
        } catch (error) {
            const message = `Une erreur s'est produite lors de la récupération des pokémons. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error.message });
        }
    });
};

export default findManyPokemon;
