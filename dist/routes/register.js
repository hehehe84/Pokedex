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
const prisma = new client_1.PrismaClient();
const Register = (app) => {
    app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt.hash(req.body.password, 10);
            let validatedUser = yield prisma.user.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword
                },
            });
            const message = `User: ${req.body.username} is now created!`;
            res.status(200).json({ message, data: validatedUser });
        }
        catch (error) {
            const message = 'Error Creating user';
            res.status(500).json({ message, data: error.message });
        }
    }));
};
exports.default = Register;
