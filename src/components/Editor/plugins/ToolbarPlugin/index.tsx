import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_TEXT_COMMAND, LexicalEditor, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from "lexical";
import { mergeRegister } from "@lexical/utils";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Dropdown, MenuProps, Select, SelectProps } from "antd";
import DropDown from "../../ui/DropDown";

const LowPriority = 1;

/**
 * Divide Tool Column
 */
const Divider:FC = () => {
  return <div className="divider" />
}

interface IBlockFormatProps {
  editor:LexicalEditor;
  disabled?:boolean;
}

const BlockFormatDropDown:FC<IBlockFormatProps> = (props) => {

  const {
    disabled = false
  } = props;

  const [activity, setActivity] = useState();

  const options:SelectProps["options"] = [
    {
      label:"Nomal",
      value:"nomal",
    },
    {
      label: "Heading 1",
      value: "heading1",
    },
    {
      label: "Heading 2",
      value: "heading2",
    },
    {
      label: "Heading 3",
      value: "heading3"
    },
    {
      label: "Heading 4",
      value: "heading4",
    },
    {
      label: "Heading 5",
      value: "heading5"
    }
  ]

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toobar-item block-controls"
      buttonIconClassName={`icon`}
    >

    </DropDown>
  )
}

const ToolBarPlugin:FC = () => {
  
  const toolbarRef = useRef(null);

  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const _updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          _updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          _updateToolbar();
          return false;
        },
        LowPriority,
      ),
      
    );
  }, [editor, _updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <BlockFormatDropDown editor={editor}/>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : '')}
        aria-label="Format Bold"
      >
        <i className="format bold" />
      </button>
    </div>
  )
}

export default ToolBarPlugin;