import ReactQuill, { type ReactQuillProps } from "react-quill";
import { StyledEditor } from "./styles";
import Toolbar, { formats } from "./toolbar";

interface Props extends ReactQuillProps {
	sample?: boolean;
}

export default function Editor({ id = "slash-quill", sample = false, ...rest }: Props) {
	const modules = {
		toolbar: {
			container: `#${id}`,
		},
		history: {
			delay: 500,
			maxStack: 100,
			useOnly: true,
		},
		syntex: true,
		clipboard: {
			matchVisual: false,
		},
	};

	return (
		<StyledEditor>
			<Toolbar id={id} isSimple={sample} />
			<ReactQuill modules={modules} formats={formats} {...rest} placeholder="Write something awesome..." />
		</StyledEditor>
	);
}
