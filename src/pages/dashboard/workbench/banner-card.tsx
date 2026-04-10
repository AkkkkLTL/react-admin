import type { CSSProperties } from "react";
import { Icon } from "@/components/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { Button } from "@/ui/button";
import { Text, Title } from "@/ui/typography";

export default function BannerCard() {
	const bgStyle: CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};

	return (
		<div className="relative bg-primary/90">
			<div className="p-6 z-2 relative">
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 md:col-span-1">
						<div className="flex flex-col gap-4">
							<Title as="h2" className="text-white">
								Explore Redesigned {GLOBAL_CONFIG.appName}
							</Title>
							<Text className="text-white">
								The rand new User Interface with power of Shadcn/ui Components. Explore the Endless possibilities with{" "}
								{GLOBAL_CONFIG.appName}.
							</Text>

							<Button
								variant={"outline"}
								className="w-fit bg-white text-black"
								onClick={() => window.open("https://discord.gg/fXemAXVNDa")}
							>
								<Icon icon="carbon:logo-discord" size={24} />
								<span className="ml-2 font-black">Join our Discord</span>
							</Button>
						</div>
					</div>

					<div className="col-span-2 md:col-span-1">
						<div className="w-full h-full flex items-center justify-end"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
