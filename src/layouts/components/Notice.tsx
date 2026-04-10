import { faker } from "@faker-js/faker";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/ui/sheet";

export default function NoticeButton() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [count, setCount] = useState(4);

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50%, 50%",
	};

	return (
		<>
			<div className="relative">
				<Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDrawerOpen(true)}>
					<Icon icon="solar:bell-bing-bold-duotone" size={24} />
				</Button>
				<Badge variant="destructive" shape="circle" className="absolute -right-2 -top-2">
					{count}
				</Badge>
			</div>
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="right" className="sm:max-w-md p-0 [&>button]:hidden flex flex-col" style={style}>
					<SheetHeader className="flex flex-row items-center justify-between p-4 h-16 shrink-0">
						<SheetTitle>Notifications</SheetTitle>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full text-primary"
							onClick={() => {
								setCount(0);
								setDrawerOpen(false);
							}}
						>
							<Icon icon="solar:check-read-broken" size={20} />
						</Button>
					</SheetHeader>
					<div className="px-4 flex-1 overflow-hidden">
						<NoticeTab />
					</div>
					<SheetFooter className="flex flex-row h-16 w-full items-center justify-between p-4 shrink-0">
						<Button variant="outline" className="flex-1 mr-2">
							Archive All
						</Button>
						<Button className="flex-1 ml-2">Mark all as read</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}

function NoticeTab() {
	return <div>NoticeTab</div>;
}
