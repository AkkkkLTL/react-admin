import { EventMap, EditorOptions } from "@toast-ui/editor";

export interface EventMapping {
  onLoad: EventMap["load"];
  onChange: EventMap["change"];
  onCaretChange: EventMap["caretChange"];
  onFocus: EventMap["focus"];
  onBlur: EventMap["blur"];
  onKeydown: EventMap["keydown"];
  onKeyup: EventMap["keyup"];
  onBeforePreviewRender: EventMap["beforePreviewRender"];
  onBeforeConvertWysiwygToMarkdown: EventMap["beforeConvertWysiwygToMarkdown"];
}

export type EventNames = keyof EventMapping;

export type EditorProps = Omit<EditorOptions, "el"> & Partial<EventMapping>;