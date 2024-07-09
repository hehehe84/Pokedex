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
const seedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.deleteMany(); // Clear existing data
        const hashedPassword = yield bcrypt.hash('Pikachu', 10);
        yield prisma.user.create({
            data: {
                username: 'Pikachu',
                password: hashedPassword,
            }
        });
        console.log('User Database seeded!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
seedDb().catch((error) => {
    console.error('Error seeding database:', error);
});
