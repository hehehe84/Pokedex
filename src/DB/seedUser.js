const prisma = require('../DB/dbClient');
const bcrypt = require('bcryptjs');

const seedDbUser = async () => {

    try {
        // await prisma.user.deleteMany(); // Clear existing data TO COMMENT WHEN DEPLOYMENT
        const hashedPassword = await bcrypt.hash('Pikachu', 10); 
        await prisma.user.create({
            data: {
                username: 'Pikachu',
                password: hashedPassword,
            }
        });
        console.log('User Database seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
seedDbUser();

module.exports = seedDbUser;