"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle404 = (app) => {
    app.use((res) => {
        const message = "Impossible to find this Page. Try another URL";
        res.status(404).json({ message });
    });
};
exports.default = handle404;
