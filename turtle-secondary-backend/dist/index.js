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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genai_1 = require("@google/genai");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/createProject", middleware_1.autherize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const userId = req.userId;
    if (!userId)
        return;
    if (prompt) {
        const description = prompt.split(" ")[1];
        const project = yield client.project.create({
            data: {
                description,
                userId
            }
        });
        res.json({
            projectId: project.id
        });
    }
    else {
        const project = yield client.project.create({
            data: {
                userId: userId
            }
        });
        res.json({
            projectId: project.id
        });
    }
}));
app.post("/generateUsefulName/:projectId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const projectId = req.params["projectId"];
    const userQuery = req.body.query;
    const query = (0, utils_1.generateQuer)(userQuery);
    const response = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query
    });
    console.log((_a = response.candidates[0].content) === null || _a === void 0 ? void 0 : _a.parts[0].text);
    yield client.project.update({
        where: {
            id: projectId
        },
        data: {
            description: (_b = response.candidates[0].content) === null || _b === void 0 ? void 0 : _b.parts[0].text
        }
    });
    res.json({
        msg: "done"
    });
}));
app.get("/projects", middleware_1.autherize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const project = yield client.project.findMany({
        where: {
            userId: userId
        }
    });
    res.json(project);
}));
app.post("/user/:projectId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params["projectId"];
    const userPrompt = req.body.prompt;
    console.log(projectId);
    console.log(userPrompt);
    const prompt = yield client.prompt.create({
        data: {
            content: userPrompt,
            projectId,
            type: "USER"
        }
    });
    res.json({
        prompt
    });
}));
app.post("/system/:projectId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params["projectId"];
    const userPrompt = req.body.prompt;
    console.log(projectId);
    console.log(userPrompt);
    const prompt = yield client.prompt.create({
        data: {
            content: userPrompt,
            projectId,
            type: "SYSTEM"
        }
    });
    res.json({
        prompt
    });
}));
app.get("/project/:projectId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params["projectId"];
    const prompts = yield client.prompt.findMany({
        where: {
            projectId,
        }
    });
    res.json(prompts);
}));
app.listen(3001, () => {
    console.log("server running on port 3001");
});
