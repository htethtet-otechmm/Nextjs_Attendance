import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from '@/pages/signin';
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout/layout";
import LeaveHistoryTable from "@/components/layout/leavehistoryTable/leavehistoryTable";
import Clock from "./checkin-out";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page" />
      </Head>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Home;