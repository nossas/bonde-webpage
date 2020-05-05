// import React from 'react';
import {
  DonationPlugin,
  PagarMeCheckout,
  asyncDonationCreate
} from 'bonde-webpages';
import { connect } from 'react-redux';
import { client } from '../../graphql-app';
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();

const mapStateToProps = () => ({ client });

const mapDispatchToProps = { createTransaction: asyncDonationCreate };

export default connect(mapStateToProps, mapDispatchToProps)((props: any) => (
  <PagarMeCheckout
    {...props}
    pagarmeKey={publicRuntimeConfig.pagarmeKey || 'setup env var'}
    donationComponent={DonationPlugin}
  />
));