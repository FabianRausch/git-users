import MainLayout from "@/components/ui/Layouts/MainLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { UsersProvider } from "@/context/UsersContext";
import { SnackbarProvider } from "@/context/SnackbarContext";

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactNode) => ReactNode;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <SnackbarProvider>
      <UsersProvider>{getLayout(<Component {...pageProps} />)}</UsersProvider>
    </SnackbarProvider>
  );
}
