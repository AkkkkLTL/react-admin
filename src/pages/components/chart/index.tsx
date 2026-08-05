import { Button } from "@/ui/button";
import { Card, CardHeader, CardTitle } from "@/ui/card";
import ChartArea from "./views/chart-area";
import ChartBar from "./views/chart-bar";
import ChartColumnMultiple from "./views/chart-column-multiple";
import ChartColumnNegative from "./views/chart-column-negative";
import ChartColumnSingle from "./views/chart-column-single";
import ChartColumnStacked from "./views/chart-column-stacked";
import ChartDonut from "./views/chart-donut";
import ChartLine from "./views/chart-line";
import ChartMixed from "./views/chart-mixed";
import ChartPie from "./views/chart-pie";
import ChartRadar from "./views/chart-radar";
import ChartRadial from "./views/chart-radial";

export default function ChartPage() {
	return (
		<>
			<Button variant={"link"} asChild>
				<a href="https://apexcharts.com" target="_blank" rel="noreferrer">
					https://apexcharts.com
				</a>
			</Button>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card title="Area">
					<CardHeader>
						<CardTitle>Area</CardTitle>
					</CardHeader>
					<ChartArea />
				</Card>
				<Card title="Line">
					<CardHeader>
						<CardTitle>Line</CardTitle>
					</CardHeader>
					<ChartLine />
				</Card>
				<Card title="Column Single">
					<CardHeader>
						<CardTitle>Column Single</CardTitle>
					</CardHeader>
					<ChartColumnSingle />
				</Card>
				<Card title="Column Multiple">
					<CardHeader>
						<CardTitle>Column Multiple</CardTitle>
					</CardHeader>
					<ChartColumnMultiple />
				</Card>
				<Card title="Column Stacked">
					<CardHeader>
						<CardTitle>Column Stacked</CardTitle>
					</CardHeader>
					<ChartColumnStacked />
				</Card>
				<Card title="Column Negative">
					<CardHeader>
						<CardTitle>Column Negative</CardTitle>
					</CardHeader>
					<ChartColumnNegative />
				</Card>
				<Card title="Bar">
					<CardHeader>
						<CardTitle>Bar</CardTitle>
					</CardHeader>
					<ChartBar />
				</Card>
				<Card title="Column Mixed">
					<CardHeader>
						<CardTitle>Column Mixed</CardTitle>
					</CardHeader>
					<ChartMixed />
				</Card>
				<Card title="Pie">
					<CardHeader>
						<CardTitle>Pie</CardTitle>
					</CardHeader>
					<ChartPie />
				</Card>
				<Card title="Donut">
					<CardHeader>
						<CardTitle>Donut</CardTitle>
					</CardHeader>
					<ChartDonut />
				</Card>
				<Card title="Radial">
					<CardHeader>
						<CardTitle>Radial</CardTitle>
					</CardHeader>
					<ChartRadial />
				</Card>
				<Card title="Radar">
					<CardHeader>
						<CardTitle>Radar</CardTitle>
					</CardHeader>
					<ChartRadar />
				</Card>
			</div>
		</>
	);
}
