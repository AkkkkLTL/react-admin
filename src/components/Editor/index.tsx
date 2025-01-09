import { type FC } from "react";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import ToolBarPlugin from "./plugins/ToolbarPlugin";

import "./styles.scss";

const theme = {

}

function onError(error:any) {
  console.error(error);
}

const placeholder = "Enter some rich text...";

const Editor:FC = () => {
  const initialConfig:InitialConfigType = {
    namespace: "RichEditor",
    theme,
    onError
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolBarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}

export default Editor;