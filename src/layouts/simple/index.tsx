import { type ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

export default function SimpleLayout({
    children
}:IProps) {
    return (
        <div className="flex h-screen w-full flex-col">
            {/* HeaderSimple */}
            {children}
        </div>
    );
}