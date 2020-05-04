import React, { useState, useEffect } from 'react';
import DonationStats from './components/DonationStats';

const query = `
query fetchDonationGoalStats($widgetId: Int!) {
  stats: getWidgetDonationStats(widgetId: $widgetId)
}
`;

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  fetch: any;
  widgetId: number;
  mainColor: string;
  goalDateLimit?: string;
};

const FetchDonationStats = ({
  fetch,
  widgetId,
  mainColor,
  goalDateLimit,
}: Props) => {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch({ query, variables: { widgetId } })
      .then(({ data }: any) => {
        setData(data.stats);
        setFetching(false);
      })
      .catch((err: any) => {
        console.error('FetchDonationStats: ', err);
      });
  }, [fetch, widgetId]);

  if (fetching) return <div />;
  else
    return (
      <DonationStats
        data={data}
        goalDateLimit={goalDateLimit}
        mainColor={mainColor}
      />
    );
};

export default FetchDonationStats;
