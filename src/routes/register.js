const prisma = require('../DB/dbClient');
const bcrypt = require('bcryptjs');


const Register = (app) => {
    app.post('/api/register', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let validatedUser = await prisma.user.create({
                data : {
                    username: req.body.username,
                    password: hashedPassword
                },
            });
            const message = `User: ${req.body.username} is now created!`
            res.status(200).json({message, data: validatedUser});
        } catch(error) {
            const message = 'Error Creating user';
            res.status(500).json({message, data: error.message});
        }
    })
}
module.exports = Register;