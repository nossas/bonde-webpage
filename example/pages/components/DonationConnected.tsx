import React from 'react';
import { createApolloFetch } from 'apollo-fetch';
import { DonationPlugin } from 'bonde-webpages';

// TODO: use enviroment variable
const fetch = createApolloFetch({
  uri: 'https://api-v2.staging.bonde.org/graphql',
});

export default (props: any) => <DonationPlugin fetch={fetch} {...props} />;
