"use client";

import { store, useAppSelector } from "@/features/store";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: any;
}

const Content = ({ children }: ProvidersProps) => {
  const { theme } = useAppSelector((state) => state.header);

  useEffect(() => {
    const handleSystemColorTheme = () => {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    };

    if (theme === "system") {
      handleSystemColorTheme();
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", handleSystemColorTheme);
      return () => {
        mediaQuery.removeEventListener("change", handleSystemColorTheme);
      };
    } else {
      document.documentElement.className = theme;
    }
  }, [theme]);

  return <HeroUIProvider>{children}</HeroUIProvider>;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <Content>{children}</Content>
    </Provider>
  );
};

export default Providers;
