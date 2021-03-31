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
import { client } from '../../graphql-app';
import getConfig from 'next/config';
import Utils from '../../Utils';

const { publicRuntimeConfig } = getConfig();

const mapStateToProps = () => ({ client });

const mapDispatchToProps = {
  createTransaction: asyncDonationCreate,
  asyncDonationConvert
};

export default connect(mapStateToProps, mapDispatchToProps)((props: any) => (
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