import getConfig from 'next/config';

let endpoint: string;

if (process.env.NODE_ENV !== 'test') {
  const { publicRuntimeConfig } = getConfig();
  endpoint = publicRuntimeConfig.domainApiActivists || 'https://api-graphql.bonde.devel/v1/graphql';
};

export interface Response {
  data: any;
};

export default async (query: string): Promise<Response> => {
  const response = await fetch(endpoint, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: query,
  });

  return await response.json();
};