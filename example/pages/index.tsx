import * as React from 'react'
import Head from 'next/head'

import { Styles } from 'bonde-webpages';
import Redux from './redux';
import MobilizationConnected from './components/MobilizationConnected';
import FetchData from './FetchData';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Redux>
        <Styles>
          <FetchData customDomain='www.meurio.org.br'>
            <MobilizationConnected />
          </FetchData>
        </Styles>
      </Redux>
    </div>
  )
}
