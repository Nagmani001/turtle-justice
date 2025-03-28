"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autherize = autherize;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function autherize(req, res, next) {
    try {
        const token = req.header("Authorization");
        const actualToken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        if (!token || !actualToken)
            return;
        const decoded = jsonwebtoken_1.default.verify(actualToken, config_1.JWT_SECRET, {
            algorithms: ["RS256"]
        });
        if (!decoded) {
            res.json({ msg: "unauthorized" });
            return;
        }
        console.log(decoded);
        const userId = decoded.sub;
        if (!userId) {
            res.json({ "msg": "unauthorized" });
            return;
        }
        req.userId = userId;
        next();
    }
    catch (err) {
        console.log(err);
        res.json({
            msg: "invalid authentication "
        });
    }
}
