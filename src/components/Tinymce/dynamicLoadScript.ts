import type { TinyMCE } from "tinymce";

type CallBack = (message:any, script:HTMLScriptElement) => void

let callbacks:CallBack[] = [];

export function loadedTinymce() {
  return (window as any).tinymce as TinyMCE
}

const dynamicLoadScript = (src:string, callback:CallBack) => {
  const existingScript = document.getElementById(src) as HTMLScriptElement;
  const cb = callback || function() {}

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src;
    script.id = src;
    document.body.appendChild(script);
    callbacks.push(cb);
    const onEnd = "onload" in script ? stdOnEnd : ieOnEnd;
    onEnd(script);
  }

  if (existingScript && cb) {
    if (loadedTinymce()) {
      cb(null, existingScript);
    } else {
      callbacks.push(cb);
    }
  }

  function stdOnEnd(script:HTMLScriptElement) {
    script.onload = function() {
      this.onerror = this.onload = null;
      for (const cb of callbacks) {
        cb(null, script);
      }
      callbacks = [];
    }
    script.onerror = function() {
      this.onerror = this.onload = null;
      cb(new Error("Failed to load " + src), script);
    }
  }

  function ieOnEnd(script:HTMLScriptElement) {
    script.onreadystatechange = function() {
      this.onreadystatechange = function() {
        if (this.readyState !== "complete" && this.readyState !== "loaded") return;
        this.onreadystatechange = null;
        for (const cb of callbacks) {
          cb(null, script);
        }
        callbacks = [];
      }
    }
  }
}

export default dynamicLoadScript;