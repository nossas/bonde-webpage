// import React from 'react';
import {
  DonationPlugin,
  PagarMeCheckout,
  asyncDonationCreate,
  asyncDonationConvert,
  FinishMessageCustom,
  FinishDonationMessage,
  DonationAnalytics,
  DonationTellAFriend
} from 'bonde-webpages';
import { connect } from 'react-redux';
// import { client } from '../../graphql-app';
import getConfig from 'next/config';
import Utils from '../../Utils';
import fetch from 'node-fetch';

const { publicRuntimeConfig } = getConfig();

// const mapStateToProps = () => ({ client });

const mapDispatchToProps = () => ({
  createTransaction: asyncDonationCreate,
  asyncDonationConvert,
  asyncFetchDonationsStats: async (args: any) => (await fetch('/api/data/donations', {
    method: 'post',
    body: JSON.stringify(args),
    headers: { 'Content-Type': 'application/json' }
  })).json()
});

export default connect(null, mapDispatchToProps)((props: any) => (
  <PagarMeCheckout
    {...props}
    pagarmeKey={publicRuntimeConfig.pagarmeKey || 'setup env var'}
    donationComponent={DonationPlugin}
    analyticsEvents={DonationAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: DonationTellAFriend,
        props: { imageUrl: Utils.imageUrl, href: Utils.getSharedPath(props.mobilization) }
      },
      FinishDonationMessage: {
        component: FinishDonationMessage,
        props: { imageUrl: Utils.imageUrl, href: Utils.getSharedPath(props.mobilization) }
      }
    }}
  />
));