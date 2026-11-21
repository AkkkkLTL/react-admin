import { type ChangeEvent, useMemo, useState } from "react";

interface DataFilterType<T extends { name: string }> {
	dataSource: T[];
}

export const useDataFilter = <T extends { name: string }>({ dataSource }: DataFilterType<T>) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const filteredData = useMemo(() => {
		const keyword = searchValue.trim().toLowerCase();
		if (!keyword) return dataSource;
		return dataSource.filter((item) => item.name.toLowerCase().includes(keyword));
	}, [searchValue, dataSource]);

	return {
		searchValue,
		handleInputChange,
		filteredData,
	};
};
