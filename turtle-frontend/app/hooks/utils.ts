"use client";
import { useAuth } from "@clerk/nextjs";

const { getToken } = useAuth()

export const fetchProjects = async () => {
  const token = await getToken();
  const response = await axios.get("http://localhost:3001/projects", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.data;
}

