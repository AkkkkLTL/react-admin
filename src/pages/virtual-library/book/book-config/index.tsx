import { memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Icon } from "@/components/icon";
import { usePathname, useRouter } from "@/router/hooks";
import { themeVars } from "@/theme/theme.css";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";

export default memo(function BookConfig() {
	const path = usePathname();
	const configType = ["category", "publisher", "source"].includes(path.split("/").pop() || "none")
		? path.split("/").pop() || "category"
		: "category";
	const { replace } = useRouter();
	const [tabState, setTabState] = useState(configType);

	const handleTabChange = (value: string) => {
		setTabState(value);
		replace(`/library/book/config/${value}`);
	};

	useEffect(() => {
		setTabState(configType);
	}, [configType]);

	return (
		<div className="flex flex-col w-full gap-5">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-2">
					<span className="text-3xl text-foreground">纸质书配置</span>
					<span className="text-sm text-gray-500">管理分类与来源，让每一条收藏都有迹可循。</span>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Icon icon="material-symbols:book-ribbon-outline" size={16} color={themeVars.colors.palette.gray[500]} />
					<span className="text-sm text-gray-500">仅用于纸质书模块</span>
				</div>
			</div>
			<Tabs value={tabState} onValueChange={handleTabChange} className="gap-5">
				<div className="w-full border-b">
					<TabsList variant={"line"} className="[&_button]:px-0 gap-6 p-0">
						<TabsTrigger value="category">纸质书分类</TabsTrigger>
						<TabsTrigger value="publisher">出版社</TabsTrigger>
						<TabsTrigger value="source">阅读来源</TabsTrigger>
					</TabsList>
				</div>
				<div className="flex flex-row items-center justify-start w-full bg-primary/10 gap-2 p-3 rounded-lg mb-1">
					<Icon icon="material-symbols:info-outline-rounded" color={themeVars.colors.palette.primary.default} />
					<span className="text-sm text-primary">
						修改名称会同步更新书籍中的显示；已关联书籍的条目暂不可删除，请先调整对应书籍的归属。
					</span>
				</div>
				<Outlet />
			</Tabs>
		</div>
	);
});
