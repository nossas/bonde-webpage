import gql from 'graphql-tag';

import type { Filter, BlockGraphQL } from './types';
import { client as GraphQLAPI } from '.';

const asyncFilterBlocksGraphql = ({ slug, custom_domain }: any) => (dispatch: any) => {
  dispatch({ type: 'FILTER_BLOCKS_REQUEST' });

  let filter: Filter = {};
  if (slug) filter.slug = { _eq: slug };
  if (custom_domain) filter.custom_domain = { _eq: custom_domain };

  return GraphQLAPI.query({
    query: gql`
      query ($filter: mobilizations_bool_exp!) {
        blocks(where: { mobilization: $filter }) {
          id
          menu_hidden
          hidden
          bg_class
          bg_image
          name
          position
        }
      }
    `,
    variables: { filter },
    fetchPolicy: "no-cache"
  })
    .then(({ data }: { data: { blocks: BlockGraphQL[] } }) => {
      dispatch({
        type: 'FILTER_BLOCKS_SUCCESS',
        payload: data.blocks
      });
      return Promise.resolve();
    })
    .catch((err: any) => {
      dispatch({ type: 'FILTER_BLOCKS_FAILURE', payload: err });
      console.log('failed', err);
      return Promise.reject(err);
    })
}

export default asyncFilterBlocksGraphql;