import { openDB } from "idb";

// 打开或创建数据库
export const openDatabase = async (databaseName: string, storeName: Record<string, string>, version: number = 1) => {
	return openDB(databaseName, version, {
		upgrade(db, oldVersion) {
			console.log(`数据库从版本 v${oldVersion} 升级到版本 v${version}`);

			for (const key in storeName) {
				if (!db.objectStoreNames.contains(storeName[key])) {
					// 创建对象存储
					db.createObjectStore(storeName[key], {
						keyPath: "id",
						autoIncrement: true,
					});
				}
			}
		},

		// 数据库被其他标签页阻塞时的处理
		blocked(currentVersion, blockedVersion) {
			console.warn(`数据库被版本 v${blockedVersion} 阻塞`);
		},

		// 数据库连接终止时的处理
		terminated() {
			console.log("数据库连接终止");
		},
	});
};
