import { useRef } from "react";
import { Doc } from 'yjs';
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
// @ts-ignore
import { WebsocketProvider } from 'y-websocket';

const serverWsUrl = "ws://localhost:5173"

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface IOwnProps {
  roomId: string;
}

export default function CodeEditor({ roomId }: IOwnProps): JSX.Element {

  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;

    const doc = new Doc(); // collection of shared objects

    // Connect to peers with WebSocket
    const provider: WebsocketProvider = new WebsocketProvider(serverWsUrl, roomId, doc);
    const type = doc.getText("monaco");

    // Dynamic import 
    const { MonacoBinding } = await import("y-monaco")

    // Bind yjs doc to Manaco editor
    const binding = new MonacoBinding(type, editorRef.current!.getModel()!, new Set([editorRef.current]), provider.awareness);

    provider.on('status', (event: { status: any; }) => {
      console.log(event.status) // logs "connected" or "disconnected"
    })

  }

  return (
    <>
      <Editor
        height="100vh"
        width="80vw"
        language={"python"}
        theme={"vs-dark"}
        onMount={handleEditorDidMount}
      />
    </>
  );
}