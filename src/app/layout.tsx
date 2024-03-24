import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const fontFamily = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kubernetes cluster and cost analyser",
    description: "Fix common issues in your kubernetes clusters",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={fontFamily.className}>{children}</body>
        </html>
    );
}
