import { FC, useEffect, useRef, useState } from "react";

import Editor, { EventMap } from "@toast-ui/editor";
import { EditorProps, EventNames } from "./types";
import "@toast-ui/editor/dist/toastui-editor.css";

const ToastEditor:FC<EditorProps> = (props) => {

  const rootEl = useRef(null);
  const [editorInst, setEditorInst] = useState<Editor>();

  const getBindingEventNames = () => {
    return Object.keys(props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => props[key as EventNames]);
  }

  const getInitEvents = () => {
    return getBindingEventNames().reduce(
      (acc:Record<string, EventMap[keyof EventMap]>, key) => {
        const eventName = (key[2].toLowerCase() + key.slice(3)) as keyof EventMap;
        acc[eventName] = props[key as EventNames];
        return acc;
      },
      {}
    );
  }

  useEffect(() => {
    const instance = new Editor({
      el: rootEl.current!,
      ...props,
      events: getInitEvents(),
    });
    setEditorInst(instance);

    return () => {
      editorInst?.destroy();
      setEditorInst(undefined);
    }
  }, []);

  return (
    <div ref={rootEl}/>
  )
}

export default ToastEditor;