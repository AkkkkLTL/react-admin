import ToastEditor from "@/components/MarkdownEditor";
import { FC } from "react";

const content = [
  '![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)',
  '',
  '# Awesome Editor!',
  '',
  'It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.',
  '',
  '## Create Instance',
  '',
  'You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).',
  '',
  '```js',
  'const editor = new Editor(options);',
  '```',
  '',
  '> See the table below for default options',
  '> > More API information can be found in the document',
  '',
  '| name | type | description |',
  '| --- | --- | --- |',
  '| el | `HTMLElement` | container element |',
  '',
  '## Features',
  '',
  '* CommonMark + GFM Specifications',
  '   * Live Preview',
  '   * Scroll Sync',
  '   * Auto Indent',
  '   * Syntax Highlight',
  '        1. Markdown',
  '        2. Preview',
  '',
  '## Support Wrappers',
  '',
  '> * Wrappers',
  '>    1. [x] React',
  '>    2. [x] Vue',
  '>    3. [ ] Ember',
].join('\n');

const Markdown:FC = () => {
  return (
    <div className="components-container">
      <ToastEditor previewStyle="vertical" initialValue={content} height="300px" />
    </div>
  )
}

export default Markdown;