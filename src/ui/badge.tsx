import { cva, type VariantProps } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/utils/index";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				info: "border-transparent bg-info/20 text-info-dark [a&]:hover:bg-info/10 focus-visible:ring-info/20 dark:focus-visible:ring-info/40  dark:text-info-light",
				warning:
					"border-transparent bg-warning/20 text-warning-dark [a&]:hover:bg-warning/10 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:text-warning-light",
				success:
					"border-transparent bg-success/20 text-success-dark [a&]:hover:bg-success/10 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:text-success-light",
				error:
					"border-transparent bg-error/20 text-error-dark [a&]:hover:bg-error/10 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:text-error-light",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
			shape: {
				circle: "rounded-full w-5 h-5 p-0",
				square: "rounded-md",
				dot: "rounded-full w-2 h-2 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "square",
		},
	},
);

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean };

function Badge({ className, variant, shape, asChild = false, ...props }: BadgeProps) {
	const Comp = asChild ? SlotPrimitive.Slot : "span";

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant, shape }), className)} {...props} />;
}

export { Badge, badgeVariants };
