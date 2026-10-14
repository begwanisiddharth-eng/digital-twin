import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { resume } from "@/lib/resume-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${resume.name} – CRM & CX Transformation Leader`,
  description: resume.tagline,
  openGraph: {
    title: resume.name,
    description: resume.tagline,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3d3e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
