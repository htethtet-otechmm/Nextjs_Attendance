import "@/styles/globals.css";
import { useRouter } from 'next/router';
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noLayoutPages = ['/']; 

  if (noLayoutPages.includes(router.pathname)) {
    return <Component {...pageProps} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
