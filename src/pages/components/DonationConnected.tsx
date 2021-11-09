// import React from 'react';
import {
  DonationPlugin,
  PagarMeCheckout,
  FinishMessageCustom,
  FinishDonationMessage,
  DonationAnalytics,
  DonationTellAFriend,
} from 'bonde-webpages';
import getConfig from 'next/config';
import fetch from 'node-fetch';
import { connect } from 'react-redux';

import Utils from '../../Utils';

const { publicRuntimeConfig } = getConfig();

const mapDispatchToProps = () => ({
  createTransaction: async (args: any) =>
    (
      await fetch('/api/actions/donation', {
        method: 'post',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),
  asyncDonationConvert: async (args: any) =>
    (
      await fetch('/api/actions/donation-convert', {
        method: 'post',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),
  asyncFetchDonationsStats: async (args: any) =>
    (
      await fetch('/api/data/donations', {
        method: 'post',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),
});

export default connect(
  null,
  mapDispatchToProps
)((props: any) => (
  <PagarMeCheckout
    {...props}
    pagarmeKey={publicRuntimeConfig.pagarmeKey || 'setup env var'}
    donationComponent={DonationPlugin}
    analyticsEvents={DonationAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: DonationTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
      FinishDonationMessage: {
        component: FinishDonationMessage,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
  />
));
