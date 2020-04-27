import * as React from 'react'
// MOBILIZATION and external dependencies
// import { Mobilization, PluggableWidget, FinishMessageCustom } from '../../../src'
// DRAFT PLUGIN and external dependencies
// import DraftPlugin from '../../../src/plugins/Draft'
// FORM PLUGIN and external dependencies
// import FormPlugin from './FormConnected'
// import { FormAnalytics, FormTellAFriend } from '../../../src/plugins/Form'
// CONTENT PLUGIN and external dependencies
import { connect } from 'react-redux'
import {
  // Plugins
  ContentPlugin,
  DraftPlugin,
  FormAnalytics,
  FormTellAFriend,
  PressureAnalytics,
  PressureTellAFriend,
  // Mobilization
  Mobilization,
  PluggableWidget,
  FinishMessageCustom,
  selectors as MobilizationSelectors
} from 'bonde-webpages'

import FormPlugin from './FormConnected';
import PressurePlugin from './PressureConnected';
// PRESSURE PLUGIN and external dependencies
// import { PressureAnalytics, PressureTellAFriend } from 'bonde-webpage/lib/plugins/pressure'
// import graphqlClient from './apolloClient'
// PRESSURE PLUGIN and external dependencies
// import DonationPlugin from './plugin-donation.connected'
// import { DonationAnalytics, DonationTellAFriend } from 'bonde-webpage/lib/plugins/donation'
// TODO: Icons should be inside plugin reference.
/*import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'*/

// import { selectors as MobilizationSelectors } from '../../../src/redux'
// import { FinishPostDonation } from 'bonde-webpage/lib/plugins/donation/components'

export const getSharedPath = (mobilization: any) => {
  const domain = 'staging.bonde.org'

  return mobilization.custom_domain
    ? `http://${mobilization.custom_domain}`
    : `http://${mobilization.slug}.${domain}`
}

const mapStateToProps = (state: any, props: any) => {
  const query = MobilizationSelectors(state, props)
  return {
    mobilization: query.getMobilization() || query.getMobilizations()[0],
    blocks: query.getBlocks(),
    blocksIsLoaded: query.blocksIsLoaded(),
    widgets: query.getWidgets()
  }
}

const imageUrl = '/static/images/check-mark-image.png'

// const MyCustomPressurePlugin = (props) => (
//   <PressurePlugin
//     {...props}
//     analyticsEvents={PressureAnalytics}
//     graphqlClient={graphqlClient}
//     overrides={{
//       FinishCustomMessage: { component: FinishMessageCustom },
//       FinishDefaultMessage: {
//         component: PressureTellAFriend,
//         props: { imageUrl, href: getSharedPath(props.mobilization) }
//       },
//     }}
//   />
// )

const plugins = [
  {
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  },
  {
    kind: 'form',
    component: (props: any) => (
      <FormPlugin
        {...props}
        analyticsEvents={FormAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: {
            component: FormTellAFriend,
            props: { imageUrl, href: getSharedPath(props.mobilization) }
          }
        }}
      />
    )
  },
  {
    kind: 'donation',
    component: () => <h2>DonationPluginTest</h2>
  },
  {
    kind: 'pressure',
    component: (props: any) => (
      <PressurePlugin
        {...props}
        analyticsEvents={PressureAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: {
            component: PressureTellAFriend,
            props: { imageUrl, href: getSharedPath(props.mobilization) }
          }
        }}
      />
    )
  },
  {
    kind: 'pressure-phone',
    component: () => <h2>PressurePhonePluginTest</h2>
  },
  {
    kind: 'content',
    component: ContentPlugin
  }
]

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

const MobilizationConnected = ({ mobilization, blocks, widgets, blocksIsLoaded }: any) => {
  if (mobilization && blocksIsLoaded) {
    // Properties received by HOC
    const {
      color_scheme: colorScheme,
      header_font: headerFont,
      body_font: bodyFont
    } = mobilization

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
          plugins
        }}
      />
    )
  }
  return <p>Carregando mobilização</p>
}

export default connect(mapStateToProps)(MobilizationConnected)
