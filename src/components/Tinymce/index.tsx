import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import dynamicLoadScript, { loadedTinymce } from "./dynamicLoadScript";
import { message } from "antd";
import plugins from "./plugins";
import toolbar from "./toolbar";

import type { Editor, TinyMCE } from "tinymce"; 
import { uuid } from "./utils";

import "./index.scss"

interface IProps {
  /**
   * 用来标记编辑区域
   */
  id:string;
  /**
   * 
   */
  inline:boolean;
  /**
   * 
   */
  initialValue:string;
  /**
   * 
   * @param a 
   * @param editor 
   * @returns 
   */
  onEditorChange:(a:string, editor:Editor) => void;
  /**
   * 
   */
  value:string;
  /**
   * 
   */
  tabIndex:number;
  height:number | string;
  width:[number,string];
  /**
   * 
   */
  licenseKey:string;
}

interface IAllProps extends Partial<IProps>{};
type EditorOptions = Parameters<TinyMCE["init"]>[0];


const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce@7.6.0/tinymce.min.js"

const TinymceEditor:FC<IAllProps> = (props) => {

  const {
    id = uuid("tiny-editor"),
    inline = false,
    value = '',
    height = 360,
    width = "auto"
  } = props;

  const elementRef = useRef(null);

  const languageTypeList = {
    "en":"en",
    "zh":"zh_CN",
    "es":"es_MX",
    "ja":"ja"
  }

  let hasChange = false;
  let hasInit = false;
  let fullscreen = false;

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(() => {
    dynamicLoadScript(tinymceCDN, (err) => {
      if (err) {
        message.error(err.message);
        return;
      }
      console.log("init Tinymce success");
      initTinymce();
    })
  }, []);

  const initTinymce = useCallback(() => {
    const tinymce = loadedTinymce();

    tinymce.init({
      selector: `#${id}`,
      language: languageTypeList["zh"],
      height: height,
      body_class: "panel-body",
      object_resizing: false,
      toolbar : toolbar,
      plugins: plugins,
      end_container_on_empty_block:true,
      powerpaste_word_import: "clean",
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: "square",
      advlist_number_styles: "default",
      imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
      default_link_target: "_blank",
      link_title: false,
      nonbreaking_force_tab:true,
      init_instance_callback: editor => {
        if (value) {
          editor.setContent(value);
        }
        hasInit = true;
        editor.on("NodeChange Change KeyUp SetContent", () => {
          hasChange = true;
        })
      },
      setup(editor) {
        editor.on("FullscreenStateChanged", (e) => {
          fullscreen = e.state;
        })
      },
      convert_urls: false
    })
  }, []);

  return (
    <div 
      className="tinymce-container"
    >
      {inline ? (
          <div 
            ref={elementRef}
            id={id}
          />
        ) : (
          <textarea 
            ref={elementRef}
            id={id}
            className="tinymce-textarea"
          />
        )
      }
      <div className="editor-custom-btn-container">
      </div>
    </div>
  )
}

export default TinymceEditor;