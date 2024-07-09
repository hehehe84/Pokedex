const PrismaClient =  require("@prisma/client");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key')

const prisma = new PrismaClient();

const login = (app) => {
    app.post('/api/login', async (req, res) => {
        try {
            const user = await prisma.user.findUnique({
                where: { username: req.body.username }, // Find user by username
            });
            if (!user){
                const message="The username does not exist";
                res.status(401).json({ message })
                return;
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            
            if(!passwordMatch) {
                const message = "Password does not match, try again!";
                res.status(401).json({ message });
                return;
            }

            //Usage of JWT

            const token = jwt.sign(
                {userId: user.id},
                privateKey,
                {expiresIn: '24h'}
            )
            
            const message = "Login Successful";
            res.status(200).json({ message, data: user, token })



        } catch(error) {
            const message = 'Error Creating user';
            res.status(500).json({message, data: error.message});
        }
    })
}
export default login;