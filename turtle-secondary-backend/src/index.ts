import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { autherize } from "./middleware";

const app = express();
const client = new PrismaClient();

app.use(express.json());
app.use(cors());

app.post("/project", autherize, async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const userId = req.userId;
  const description = prompt.split("/n")[0];
  console.log("hi bro")
  if (!userId) return;
  const project = await client.project.create({
    data: {
      description,
      userId
    }
  });
  res.json({
    projectId: project.id
  });
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

app.post("/prompt/:projectId", async (req: Request, res: Response) => {
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
