import React from 'react';
import { DonationPlugin } from 'bonde-webpages';
import { client } from '../../graphql-app';

export default (props: any) => (
  <DonationPlugin client={client} {...props} />
);