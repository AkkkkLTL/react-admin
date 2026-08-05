import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import BackgroundView from "./views/background";
import InView from "./views/inview";
import ScrollView from "./views/scroll";

export default function AnimatePage() {
	const tabs = [
		{ value: "inview", label: "In View", content: <InView /> },
		{ value: "scroll", label: "Scroll", content: <ScrollView /> },
		{ value: "background", label: "Background", content: <BackgroundView /> },
	];
	return (
		<>
			<Button variant={"link"} asChild className="mb-4 block text-primary!">
				<a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer">
					https://www.framer.com/motion/
				</a>
			</Button>
			<Tabs defaultValue={tabs[0].value}>
				<TabsList>
					{tabs.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</>
	);
}
