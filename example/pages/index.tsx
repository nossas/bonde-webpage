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
        {/* <title>{name}</title> */}
        <title>Bonde</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta name='description' content={goal} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={facebookShareTitle} />
        <meta name='twitter:description' content={facebookShareDescription} />
        <meta name='twitter:image' content={facebookShareImage} />
        <meta property='twitter:url' content={url} />
        <meta property='og:url' content={url} />
        <meta property='og:title' content={facebookShareTitle} />
        <meta property='og:description' content={facebookShareDescription} />
        <meta property='og:image' content={facebookShareImage} /> */}
        {/* <link rel='icon' type='image/png' sizes='32x32' href={favicon || 'https://static.bonde.org/static/images/icon/favicon-32.png'} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon || 'https://static.bonde.org/static/images/icon/favicon-16.png'} /> */}
        <link rel='icon' type='image/png' sizes='32x32' href='https://static.bonde.org/static/images/icon/favicon-32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='https://static.bonde.org/static/images/icon/favicon-16.png' />
        <link
          type='text/css'
          href='https://fonts.googleapis.com/css?family=Abel|Anton|Archivo+Narrow:400,400i,700,700i|Arvo:400,400i,700,700i|Asap:400,400i,700,700i|Baloo+Bhai|Bitter:400,400i,700|Bree+Serif|Cabin:400,400i,700,700i|Catamaran:400,700|Crimson+Text:400,400i,700,700i|Cuprum:400,400i,700,700i|David+Libre:400,700|Dosis:400,700|Droid+Sans:400,700|Exo+2:400,400i,700,700i|Exo:400,400i,700,700i|Fira+Sans:400,400i,700,700i|Fjalla+One|Francois+One|Gidugu|Hind:400,700|Inconsolata:400,700|Indie+Flower|Josefin+Sans:400,400i,700,700i|Karla:400,400i,700,700i|Lalezar|Lato:400,400i,700,700i|Libre+Baskerville:400,400i,700|Lobster|Lora:400,400i,700,700i|Merriweather+Sans:400,400i,700,700i|Montserrat:400,700|Muli:400,400i|Noto+Serif:400,400i,700,700i|Nunito:400,700|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,700,700i|Oswald:400,700|Oxygen:400,700|PT+Sans:400,400i,700,700i|PT+Serif:400,400i,700,700i|Pacifico|Playfair+Display:400,400i,700,700i|Poiret+One|Poppins:400,700|Quicksand:400,700|Raleway:400,400i,700,700i|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,700,700i|Ruslan+Display|Signika:400,700|Slabo+27px|Source+Sans+Pro:200,300,400,700|Titillium+Web:400,400i,700,700i|Ubuntu+Condensed|Ubuntu:400,400i,700,700i|Varela+Round|Yanone+Kaffeesatz:400,700'
          rel='stylesheet'
        />
        <script type='text/javascript' src='https://assets.pagar.me/checkout/checkout.js' />
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
