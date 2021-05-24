import * as React from 'react';
import { connect } from 'react-redux';
import {
  // Plugins
  ContentPlugin,
  DraftPlugin,
  MobilizationClass as Mobilization,
  PluggableWidget,
  FinishMessageCustom,
  selectors as MobilizationSelectors,
  PressureAnalytics,
  PressureTellAFriend,
} from 'bonde-webpages';
import { useTranslation, Trans } from 'react-i18next';

import FormPlugin from './FormConnected';
import PressureEmailPlugin from './PressureEmailConnected';
// import PressurePhonePlugin from './PressurePhonelConnected';
import DonationPlugin from './DonationConnected';
import Utils from '../../Utils';
import Footer from './Footer';

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

const MobilizationConnected = ({
  mobilization,
  blocks,
  widgets,
  blocksIsLoaded,
}: any) => {
  const { t, i18n } = useTranslation();

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
        footerComponent={Footer}
        colorScheme={colorScheme}
        headerFont={headerFont}
        bodyFont={bodyFont}
        extraWidgetProps={{
          mobilization: mobilization,
          editable: false,
          plugins,
          t,
          i18n,
          Trans
        }}
      />
    );
  }
  return <p>Carregando mobilização</p>;
};

export default connect(mapStateToProps)(MobilizationConnected);
