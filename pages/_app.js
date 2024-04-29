"use client";
import "@/styles/globals.css";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const[progress, setProgress] = useState(0)
  const router = useRouter()
  const { theme } = useTheme();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    })
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    })
  }, [])

  return (
    <ThemeProvider attribute="class">
      <LoadingBar
        color="#f11946"
        waitingTime={500}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
