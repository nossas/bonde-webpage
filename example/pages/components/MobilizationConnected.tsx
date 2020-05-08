import * as React from 'react';
import { connect } from 'react-redux';
import {
  // Plugins
  ContentPlugin,
  DraftPlugin,
  // Mobilization
  Mobilization,
  PluggableWidget,
  FinishMessageCustom,
  selectors as MobilizationSelectors,
  PressureAnalytics,
  PressureTellAFriend,
} from 'bonde-webpages';

import FormPlugin from './FormConnected';
import PressureEmailPlugin from './PressureEmailConnected';
// import PressurePhonePlugin from './PressurePhonelConnected';
import DonationPlugin from './DonationConnected';
import Utils from '../../Utils';

// import graphqlClient from './apolloClient'
// PRESSURE PLUGIN and external dependencies
// import DonationPlugin from './plugin-donation.connected'
// import { DonationAnalytics, DonationTellAFriend } from 'bonde-webpage/lib/plugins/donation'
// TODO: Icons should be inside plugin reference.
/*import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'*/

const mapStateToProps = (state: any, props: any) => {
  const query = MobilizationSelectors(state, props);
  return {
    mobilization: query.getMobilization() || query.getMobilizations()[0],
    blocks: query.getBlocks(),
    blocksIsLoaded: query.blocksIsLoaded(),
    widgets: query.getWidgets(),
  };
};

const plugins = [
  {
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true },
  },
  {
    kind: 'form',
    component: FormPlugin,
  },
  {
    kind: 'donation',
    component: DonationPlugin,
  },
  {
    kind: 'pressure',
    component: (props: any) => (
      <PressureEmailPlugin
        {...props}
        analyticsEvents={PressureAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: {
            component: PressureTellAFriend,
            props: {
              imageUrl: Utils.imageUrl,
              href: Utils.getSharedPath(props.mobilization),
            },
          },
        }}
      />
    ),
  },
  {
    kind: 'pressure-phone',
    component: () =>
      // <PressurePlugin {...props} PluginComponent={PhonePressurePlugin} />
      null,
  },
  {
    kind: 'content',
    component: ContentPlugin,
  },
];

// componentDidMount() {
//   const isTest = false
//   if (!isTest && this.props.mobilization) {
//     const { mobilization } = this.props

//     ReactGA.initialize('UA-26278513-30')
//     ReactGA.pageview('/' + mobilization.slug)

//     if (mobilization.google_analytics_code) {
//       ReactGA.initialize(
//         mobilization.google_analytics_code,
//         { gaOptions: { name: 'MobilizationTracker' } }
//       )
//       ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
//     }
//   }
// }

const MobilizationConnected = ({
  mobilization,
  blocks,
  widgets,
  blocksIsLoaded,
}: any) => {
  if (mobilization && blocksIsLoaded) {
    // Properties received by HOC
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont,
    } = mobilization;

    return (
      <Mobilization
        linkTo={(b: any) => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        colorScheme={colorScheme}
        headerFont={headerFont}
        bodyFont={bodyFont}
        extraWidgetProps={{
          mobilization: mobilization,
          editable: false,
          plugins,
        }}
      />
    );
  }
  return <p>Carregando mobilização</p>;
};

export default connect(mapStateToProps)(MobilizationConnected);
