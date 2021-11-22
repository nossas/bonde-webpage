import Head from 'next/head';
import Error404 from './404';
import asyncFilterBlocksGraphql from '../graphql-app/filterBlocks';
import asyncFilterMobilizationsGraphql from '../graphql-app/filterMobilizations';
import asyncFilterWidgetsGraphql from '../graphql-app/filterWidgets';
import MeuRioStyles from '../components/MeuRioStyles';
import Styles from '../bonde-webpage/Styles';
import MobilizationConnected from '../components/MobilizationConnected';

interface PageProperties {
  mobilization: any;
  blocks: any[];
  widgets: any[];
}

function Page({ mobilization, blocks, widgets }: PageProperties) {
  console.log("PageProperties >>>", { mobilization, blocks, widgets })
  if (!mobilization) return <Error404 />;

  const {
    name,
    goal,
    favicon,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    facebook_share_image: facebookShareImage,
    custom_domain: customDomain,
    google_analytics_code: googleAnalyticsCode,
    slug,
    // language,
  } = mobilization;

  const domain = customDomain || `${slug}.bonde.org`;
  const url = `https://${domain}`;

  return (
    <div className="container">
      <Head>
        <title>{name}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={goal} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={facebookShareTitle} />
        <meta name="twitter:description" content={facebookShareDescription} />
        <meta name="twitter:image" content={facebookShareImage} />
        <meta property="twitter:url" content={url} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={facebookShareTitle} />
        <meta property="og:description" content={facebookShareDescription} />
        <meta property="og:image" content={facebookShareImage} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={
            favicon ||
            'https://static.bonde.org/static/images/icon/favicon-32.png'
          }
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={
            favicon ||
            'https://static.bonde.org/static/images/icon/favicon-16.png'
          }
        />
        <link
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Abel|Anton|Archivo+Narrow:400,400i,700,700i|Arvo:400,400i,700,700i|Asap:400,400i,700,700i|Baloo+Bhai|Bitter:400,400i,700|Bree+Serif|Cabin:400,400i,700,700i|Catamaran:400,700|Crimson+Text:400,400i,700,700i|Cuprum:400,400i,700,700i|David+Libre:400,700|Dosis:400,700|Droid+Sans:400,700|Exo+2:400,400i,700,700i|Exo:400,400i,700,700i|Fira+Sans:400,400i,700,700i|Fjalla+One|Francois+One|Gidugu|Hind:400,700|Inconsolata:400,700|Indie+Flower|Josefin+Sans:400,400i,700,700i|Karla:400,400i,700,700i|Lalezar|Lato:400,400i,700,700i|Libre+Baskerville:400,400i,700|Lobster|Lora:400,400i,700,700i|Merriweather+Sans:400,400i,700,700i|Montserrat:400,700|Muli:400,400i|Noto+Serif:400,400i,700,700i|Nunito:400,700|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,700,700i|Oswald:400,700|Oxygen:400,700|PT+Sans:400,400i,700,700i|PT+Serif:400,400i,700,700i|Pacifico|Playfair+Display:400,400i,700,700i|Poiret+One|Poppins:400,700|Quicksand:400,700|Raleway:400,400i,700,700i|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,700,700i|Ruslan+Display|Signika:400,700|Slabo+27px|Source+Sans+Pro:200,300,400,700|Titillium+Web:400,400i,700,700i|Ubuntu+Condensed|Ubuntu:400,400i,700,700i|Varela+Round|Yanone+Kaffeesatz:400,700&display=optional"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://assets.pagar.me/checkout/checkout.js"
          async
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${{
            googleAnalyticsCode,
          }}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsCode}', {
                debug_mode: true,
                page_location: '${url}',
                page_title: '${name}'
              });
            `,
          }}
        />
      </Head>
      <Styles />
      <MeuRioStyles>
        <MobilizationConnected
          mobilization={mobilization}
          blocks={blocks}
          widgets={widgets}
          blocksIsLoaded
        />
      </MeuRioStyles>
      {/* <AppLanguage
        initialLanguage={language}
        initialI18nStore={initialI18nStore}
      /> */}
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const { host } = getState().sourceRequest;
  // const { protocol } = getState().sourceRequest;
  // const appDomain = publicRuntimeConfig.domainPublic || 'staging.bonde.org';
  // const appDomain = "localhost:3000"
  // const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent || '';

  // Resolve ataque de bots
  // if (userAgent.toLowerCase().indexOf('less') > 0) {
  //   res?.end();
  // }

  // if (host) {
  //   if (res) {
  //     if (!host.startsWith('www', 0)) {
  //       res.writeHead(302, {
  //         Location: `${protocol}://www.${host}`,
  //       });
  //       res.end();
  //     }
  //   }
  // }

  // const fetchData = async (filter?: any) => {
  //   // const regex = host.match(`(.+).${appDomain}`);
  //   // const where = regex
  //   //   ? { slug: regex[1].replace(/^www\./, '') }
  //   //   : { custom_domain: host };

  //   await asyncFilterMobilizationGraphql(filter || where));
  //   // await dispatch(asyncFilterBlockGraphql(filter || where));
  //   // await dispatch(asyncFilterWidgetGraphql(filter || where));
  // };
  const filter: any = {
    slug: 'teste-de-widgets'
  }

  const { mobilizations } = await asyncFilterMobilizationsGraphql(filter)
  const { blocks } = await asyncFilterBlocksGraphql(filter)
  const { widgets } = await asyncFilterWidgetsGraphql(filter)

  // console.log("mobilizations, blocks, widgets >>>", { mobilizations, blocks, widgets });

  // await fetchData();
  // Mobiization with all widgets configured.
  // await fetchData({ slug: 'teste-de-widgets' });

  // const data = await res.json()

  // Pass data to the page via props
  // return { props: { data } }
  return { props: { mobilization: mobilizations[0], blocks, widgets } };
}

export default Page;