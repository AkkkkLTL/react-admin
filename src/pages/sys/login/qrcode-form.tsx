import { QRCodeSVG } from "qrcode.react";
import useLocale from "@/locales/use-locale";
import { ReturnButton } from "./components/return-button";
import { LoginStateEnum, useLoginStateContext } from "./providers/login-provider";

export default function QrCodeFrom() {
	const { t } = useLocale();
	const { loginState, backToLogin } = useLoginStateContext();

	if (loginState !== LoginStateEnum.QR_CODE) return null;
	return (
		<>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">{t("sys.login.qrSignInFormTitle")}</h1>
				<p className="text-balance text-sm text-muted-foreground">{t("sys.login.scanSign")}</p>
			</div>
			<div className="flex w-full flex-col items-center justify-center p-4">
				<QRCodeSVG value="https://github.com" size={200} />
			</div>
			<ReturnButton onClick={backToLogin} />
		</>
	);
}
