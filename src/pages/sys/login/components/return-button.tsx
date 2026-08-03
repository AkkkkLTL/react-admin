import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { Button } from "@/ui/button";

interface ReturnButtonProps {
	onClick?: () => void;
}

export function ReturnButton({ onClick }: ReturnButtonProps) {
	const { t } = useLocale();
	return (
		<Button variant="link" onClick={onClick} className="w-full cursor-pointer text-accent-foreground">
			<Icon icon="solar:alt-arrow-left-linear" size={20} />
			<span className="text-sm">{t("sys.login.backSignIn")}</span>
		</Button>
	);
}
