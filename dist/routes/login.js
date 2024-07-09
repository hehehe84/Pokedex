"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
const prisma = new client_1.PrismaClient();
const login = (app) => {
    app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { username: req.body.username }, // Find user by username
            });
            if (!user) {
                const message = "The username does not exist";
                res.status(401).json({ message });
                return;
            }
            const passwordMatch = yield bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                const message = "Password does not match, try again!";
                res.status(401).json({ message });
                return;
            }
            //Usage of JWT
            const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '24h' });
            const message = "Login Successful";
            res.status(200).json({ message, data: user, token });
        }
        catch (error) {
            const message = 'Error Creating user';
            res.status(500).json({ message, data: error.message });
        }
    }));
};
exports.default = login;
