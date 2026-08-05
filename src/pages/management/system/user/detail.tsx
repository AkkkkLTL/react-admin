import { useParams } from "@/router/hooks";
import { Card, CardContent } from "@/ui/card";

export default function UserDetail() {
	const { id } = useParams();
	// 获取用户详情数据
	return (
		<Card>
			<CardContent>
				<p>This is the detail page of {id}</p>
			</CardContent>
		</Card>
	);
}
