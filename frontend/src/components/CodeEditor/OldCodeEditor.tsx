import { useState, useRef } from "react";
// import * as Y from 'yjs';
// import { WebsocketProvider } from 'y-websocket'
// import { MonacoBinding } from 'y-monaco';

// const serverWsUrl = "wss://localhost:5174"

// export default function CodeEditor(): JSX.Element {

//   const editorRef = useRef<editor.IStandaloneCodeEditor>();

//   function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
//       editorRef.current = editor;

//       // Initialize yjs
//       const doc = new Y.Doc(); // collection of shared objects

//       // Connect to peers with WebSocket
//       const provider: WebsocketProvider = new WebsocketProvider(serverWsUrl, "roomId", doc);
//       const type = doc.getText("monaco");

//       // Bind yjs doc to Manaco editor
//       const binding = new MonacoBinding(type, editorRef.current!.getModel()!, new Set([editorRef.current!]));

//   }

//   return (
//       <>
//       <Editor 
//           height="100vh"
//           language={"cpp"}
//           defaultValue={"default value"}
//           theme={"vs-dark"}
//           onMount={handleEditorDidMount}
//       />
//       </>
//   );
// }

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const serverWsUrl = "wss://localhost:5174"

export default function OldCodeEditor() {

  function onChange(newValue, e) {
    console.log('onChange', newValue);
    // const model = this.refs.monaco.editor.getModel();
    // const value = model.getValue();
  }

  function editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();

    // @ts-ignore
    window.MonacoEnvironment.getWorkerUrl = (
      _moduleId: string,
      label: string
    ) => {
      if (label === "json")
        return "_next/static/json.worker.js";
      if (label === "css")
        return "_next/static/css.worker.js";
      if (label === "html")
        return "_next/static/html.worker.js";
      if (
        label === "typescript" ||
        label === "javascript"
      )
        return "_next/static/ts.worker.js";
      return "_next/static/editor.worker.js";
    }

  }

  // etc
  return (<div>
    <MonacoEditor
      // ref={editorRef}
      editorDidMount={editorDidMount}
      height="100vh"
      width="80vw"
      language="python"
      theme="vs-dark"
      value="# Enter code below"
      options={{
        minimap: {
          enabled: false
        }
      }}
      onChange={onChange}

    />
  </div>)
}