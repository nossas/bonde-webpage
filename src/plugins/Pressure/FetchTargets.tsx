import React, { useState, useEffect } from 'react';
// import gql from 'graphql-tag';
// import DonationStats from './DonationStats';

// const query = gql`
//   query Targets($widgetId: Int!) {
//     pressure_targets(
//       where: { widget_id: { _eq: $widgetId } }
//       order_by: { label: asc }
//     ) {
//       identify
//       label
//       targets
//       email_subject
//       email_body
//     }
//   }
// `;

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFetchTargets: any;
  widgetId: number;
  children: any;
};

const FetchTargets = ({ asyncFetchTargets, widgetId, children }: Props) => {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    asyncFetchTargets({ widget_id: widgetId })
      .then(({ data }: any) => {
        setData(data.pressure_targets);
        setFetching(false);
      })
      .catch((err: any) => {
        console.error('FetchTargets: ', err);
      })
    ;
    // client
    //   .query({ query, variables: { widgetId } })
    //   .then(({ data }: any) => {
    //   })
    //   .catch((err: any) => {
    //     console.error('FetchTargets: ', err);
    //   });
  }, [asyncFetchTargets, widgetId]);

  if (fetching) return <div />;
  else return children({ data });
};

export default FetchTargets;
