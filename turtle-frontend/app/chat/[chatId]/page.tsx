import ChatClient from "./ChatClient";

export default async function({ params }: {
  params: {
    chatId: string
  }
}) {
  const projectId = await params.chatId;
  return <div>
    <ChatClient params={{ chatId: projectId }} />
  </div>
}
