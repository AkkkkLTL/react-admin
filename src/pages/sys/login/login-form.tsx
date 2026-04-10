import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiSysLoginCaptcha, type SysLoginReq } from "@/api/services/sys-login.service";
import { GLOBAL_CONFIG } from "@/global-config";
import useLocale from "@/locales/useLocale";
import { useRouterContext } from "@/router/router-provider";
import { useSignIn } from "@/store/modules/userSlice";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { cn, getUUID } from "@/utils";
import { LoginStateEnum, useLoginStateContext } from "./providers/login-provider";

export default function LoginForm({ className, ...props }: React.ComponentPropsWithRef<"form">) {
	const { t } = useLocale();
	const [loading, setLoading] = useState(false);
	const [remember, setRemember] = useState(true);
	const [captchaPath, setCaptchaPath] = useState("");
	const [uuid, setUuid] = useState("");

	const navigate = useNavigate();
	const signIn = useSignIn();
	const { loginState, setLoginState } = useLoginStateContext();
	const { fetchMenuData } = useRouterContext();

	const getCaptcha = async () => {
		const uuid = getUUID();
		setUuid(uuid);
		setCaptchaPath((await apiSysLoginCaptcha(uuid)).data);
	};

	useEffect(() => {
		getCaptcha();
	}, []);

	const form = useForm<SysLoginReq>({
		defaultValues: {
			username: "",
			password: "",
			captcha: "",
		},
	});

	if (loginState !== LoginStateEnum.LOGIN) return null;

	const handleFinish = async (values: SysLoginReq) => {
		setLoading(true);
		try {
			await signIn(values).then(async () => {
				await fetchMenuData();
				navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
				toast.success(t("sys.login.loginSuccessTitle"), {
					closeButton: true,
				});
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<Form {...form} {...props}>
				<form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold">{t("sys.login.signInFormTitle")}</h1>
						<p className="text-balance text-sm text-muted-foreground">{t("sys.login.signInFormDescription")}</p>
					</div>

					<FormField
						control={form.control}
						name="username"
						rules={{ required: t("sys.login.accountPlaceholder") }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("sys.login.userName")}</FormLabel>
								<FormControl>
									<Input placeholder={t("sys.login.accountPlaceholder")} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						rules={{ required: t("sys.login.passwordPlaceholder") }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("sys.login.password")}</FormLabel>
								<FormControl>
									<Input placeholder={t("sys.login.passwordPlaceholder")} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="captcha"
						rules={{ required: t("sys.login.verificationCodePlaceholder") }}
						render={({ field }) => (
							<FormItem className="flex flex-row">
								<FormControl>
									<Input placeholder={t("sys.login.verificationCodePlaceholder")} {...field} />
								</FormControl>
								<FormLabel>
									<img
										src={captchaPath}
										alt={t("sys.login.verificationCodePlaceholder")}
										className="w-12 h-6 cursor-pointer"
										onClick={getCaptcha}
									/>
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 记住我 / 忘记密码 */}
					<div className="flex flex-row justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="remember"
								checked={remember}
								onCheckedChange={(checked) => setRemember(checked === "indeterminate" ? false : checked)}
							/>
							<label
								htmlFor="remember"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{t("sys.login.rememberMe")}
							</label>
						</div>
						<Button variant={"link"} onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)} size={"sm"}>
							{t("sys.login.forgetPassword")}
						</Button>
					</div>

					{/* 登录按钮 */}
					<Button type={"submit"} className="w-full">
						{loading && <Loader2 className="animate-spin mr-2" />}
						{t("sys.login.loginButton")}
					</Button>
				</form>
			</Form>
		</div>
	);
}
