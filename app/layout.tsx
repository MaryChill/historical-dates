import type { Metadata } from "next";
import "./styles/globals.scss";
import React from "react"


export const metadata: Metadata = {
  title: "historical-dates",
  description: "тестовое задание",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
