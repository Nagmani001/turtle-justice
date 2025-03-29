export const createProject = async (message: string, setProjectId: any, getToken: any) => {
  try {
    const token = await getToken();
    const project = await axios.post("http://localhost:3001/project",
      {
        prompt: message,
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    const { projectId } = project.data as any
    setProjectId(projectId);
    console.log(projectId)
  } catch (err) {

  }
}
