import { useRef } from "react";
import { Doc } from "yjs";
import { editor } from "monaco-editor";
import dynamic from "next/dynamic";
// @ts-ignore
import { WebsocketProvider } from "y-websocket";

const serverWsUrl = "ws://localhost:5173";
const VS_THEME = "vs-dark";

const Editor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface IOwnProps {
  roomId: string;
  programmingLanguage: string;
  onCodeChange: (code: string) => void;
  onSelectedCodeChange: (code: string) => void;
}

export default function CodeEditor({
  roomId,
  programmingLanguage,
  onCodeChange,
  onSelectedCodeChange,
}: IOwnProps): JSX.Element {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  async function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;

    const doc = new Doc(); // collection of shared objects

    // Connect to peers with WebSocket
    const provider: WebsocketProvider = new WebsocketProvider(
      serverWsUrl,
      roomId,
      doc,
    );
    const type = doc.getText("monaco");

    // Dynamic import
    const { MonacoBinding } = await import("y-monaco");

    // Bind yjs doc to Manaco editor
    const binding = new MonacoBinding(
      type,
      editorRef.current!.getModel()!,
      new Set([editorRef.current]),
      provider.awareness,
    );

    editorRef.current.onDidChangeModelContent(() => {
      const code = editorRef.current?.getValue();
      onCodeChange(code ?? "");
    });

    editorRef.current.onDidChangeCursorSelection((e) => {
      const selection = editorRef.current!.getSelection();
      const selectedCode = selection
        ? editorRef.current!.getModel()?.getValueInRange(selection) ?? ""
        : "";
      onSelectedCodeChange(selectedCode);
    });
  }

  return (
    <>
      <Editor
        theme={VS_THEME}
        language={programmingLanguage}
        onMount={handleEditorDidMount}
      />
    </>
  );
}
