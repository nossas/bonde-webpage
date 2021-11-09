import gql from 'graphql-tag';

import { client } from '../../../graphql-app';

const query = gql`
  query fetchDonationGoalStats($widgetId: Int!) {
    stats: getWidgetDonationStats(widgetId: $widgetId)
  }
`;

const DataDonation = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = await client.query({
      fetchPolicy: 'network-only',
      query,
      variables: { widgetId: req.body.widget_id },
    });
    return res.status(200).json({ data });
  }
  return res.status(400);
};

export default DataDonation;
