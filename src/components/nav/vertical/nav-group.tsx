import { useToggle } from "react-use";
import { Icon } from "@/components/icon";
import useLocale from "@/locales/useLocale";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import { cn } from "@/utils";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

interface GroupProps {
	name?: string;
	open: boolean;
	onClick: (nextValue: boolean) => void;
}

export function NavGroup({ name, items }: NavGroupProps) {
	const [open, setOpen] = useToggle(true);

	return (
		<Collapsible open={open}>
			<CollapsibleTrigger asChild>
				<Group name={name} open={open} onClick={setOpen} />
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul className="flex w-full flex-col gap-1">
					{items.map((item, index) => (
						<NavList key={item.title || index} data={item} depth={1} />
					))}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	);
}

function Group({ name, open, onClick }: GroupProps) {
	const { t } = useLocale();

	return (
		name && (
			<div
				className={cn(
					"group w-full inline-flex items-center justify-start relative gap-2 cursor-pointer pt-4 pr-2 pb-2 pl-3 transition-all duration-300 ease-in-out",
					"hover:pl-4",
				)}
				onClick={() => onClick(!open)}
			>
				<Icon
					icon="eva:arrow-ios-forward-fill"
					className={cn(
						"absolute left-[-4px] h-4 w-4 inline-flex shrink-0 transition-all duration-300 ease-in-out",
						"opacity-0 group-hover:opacity-100",
						{
							"rotate-90": open,
						},
					)}
				/>
				<span
					className={cn(
						"text-xs font-medium transition-all duration-300 ease-in-out text-text-disabled",
						"hover:text-text-primary",
					)}
				>
					{t(name)}
				</span>
			</div>
		)
	);
}
