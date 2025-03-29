import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { autherize } from "./middleware";
import { generateQuer } from "./utils";

const app = express();
const client = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

app.use(express.json());
app.use(cors());

app.post("/createProject", autherize, async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const userId = req.userId;
  if (!userId) return;
  if (prompt) {
    const description = prompt.split(" ")[1];
    const project = await client.project.create({
      data: {
        description,
        userId
      }
    });
    res.json({
      projectId: project.id
    });

  } else {
    const project = await client.project.create({
      data: {
        userId: userId
      }
    });
    res.json({
      projectId: project.id
    });
  }
});

app.post("/generateUsefulName/:projectId", async (req: Request, res: Response) => {
  const projectId = req.params["projectId"];
  const userQuery = req.body.query;
  const query = generateQuer(userQuery);
  const response: any = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: query
  });
  console.log(response.candidates[0].content?.parts[0].text);
  await client.project.update({
    where: {
      id: projectId
    },
    data: {
      description: response.candidates[0].content?.parts[0].text
    }
  });
  res.json({
    msg: "done"
  })
});

app.get("/projects", autherize, async (req: Request, res: Response) => {
  const userId = req.userId;
  const project = await client.project.findMany({
    where: {
      userId: userId
    }
  });
  res.json(project)
});

app.post("/user/:projectId", async (req: Request, res: Response) => {
  const projectId = req.params["projectId"];
  const userPrompt = req.body.prompt;
  console.log(projectId);
  console.log(userPrompt);
  const prompt = await client.prompt.create({
    data: {
      content: userPrompt,
      projectId,
      type: "USER"
    }
  });
  res.json({
    prompt
  })
});
app.post("/system/:projectId", async (req: Request, res: Response) => {
  const projectId = req.params["projectId"];
  const userPrompt = req.body.prompt;
  console.log(projectId);
  console.log(userPrompt);
  const prompt = await client.prompt.create({
    data: {
      content: userPrompt,
      projectId,
      type: "SYSTEM"
    }
  });
  res.json({
    prompt
  })
});

app.get("/project/:projectId", async (req: Request, res: Response) => {
  const projectId = req.params["projectId"];
  const prompts = await client.prompt.findMany({
    where: {
      projectId,
    }
  });
  res.json(prompts)
});


app.listen(3001, () => {
  console.log("server running on port 3001");
})
