import { faker } from "@faker-js/faker";

export const fakeAvatars = (count: number) => {
	const result: string[] = [];
	for (let index = 0; index < count; index++) {
		result.push(faker.image.avatarGitHub());
	}
	return result;
};

export const convertTextToBase64SVG = (text: string) => {
	const svgString = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" width="100" height="60">
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="1" font-size="100" font-family="Arial, sans-serif">
			${text}
		</text>
	</svg>
	`;
	const base64SVG = `data:image/svg+xml;base64,${btoa(encodeURIComponent(svgString))}`;
	return base64SVG;
};

export const randomFourDigit = (uuid: string) => {
	// 将 uuid 转为字符串
	const uuidString = uuid.replace(/-/g, "");
	// 从 uuid 的字符串中随机选择一个起始索引
	const startIndex = Math.random() * (uuidString.length - 4);
	// 从 uuid 字符串中截取四位数字
	const fourDigit = uuidString.substring(startIndex, startIndex + 4);

	return fourDigit;
};
