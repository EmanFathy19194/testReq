import 'react-perfect-scrollbar/dist/css/styles.css';
import "../../public/assets/css/style.css";
import type { Metadata } from "next";
import { Manrope, Merienda } from "next/font/google";
import StoreProvider from "@/redux/Providers"; // Adjust path if needed

const manrope_init = Manrope({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    variable: "--manrope",
    display: 'swap',
});

const merienda_init = Merienda({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    variable: "--merienda",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Request.com - Best Prices for Tourism Services",
    description: "Request.com is a platform that allows you to find the best prices for tourism services.",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${manrope_init.variable} ${merienda_init.variable}`}>
        <body>
        <StoreProvider>{children}</StoreProvider>
        </body>
        </html>
    );
}

