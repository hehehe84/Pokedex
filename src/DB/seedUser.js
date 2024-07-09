const {PrismaClient} =  require("@prisma/client");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const seedDbUser = async () => {

    try {
        await prisma.user.deleteMany(); // Clear existing data
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

module.exports = seedDbPok;