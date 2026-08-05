import { themeVars } from "@/theme/theme.css";
import { Card, CardContent } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";

interface ControlPanelProps {
	variantKey: {
		type: string;
		values: string[];
	}[];
	selectedVariant: string;
	onChangeVariant: (variant: string) => void;
}
export default function ControlPanel({ variantKey, selectedVariant, onChangeVariant }: ControlPanelProps) {
	const selectedStyle = (variantKey: string) => {
		return variantKey === selectedVariant
			? {
					backgroundColor: themeVars.colors.palette.primary.default,
					color: themeVars.colors.text.primary,
				}
			: {};
	};
	return (
		<Card>
			<CardContent>
				<ScrollArea className="h-[480px]">
					{variantKey.map((item) => (
						<div key={item.type}>
							<div className="text-xs font-medium">{item.type.toUpperCase()}</div>
							<ul className="mb-4 ml-2 mt-2 text-gray-600">
								{item.values.map((item) => (
									<li
										key={item}
										className="m-2 cursor-pointer rounded-md p-2"
										onClick={() => onChangeVariant(item)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												onChangeVariant(item);
											}
										}}
										style={selectedStyle(item)}
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
