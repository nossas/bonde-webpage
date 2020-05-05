import "colors";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import fetch from "node-fetch";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();


let link = createHttpLink({
  uri: publicRuntimeConfig.domainApiGraphql || "https://api-v2.staging.bonde.org/graphql",
  fetch
});

if (process.browser) {
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: publicRuntimeConfig.domainApiGraphqlWs || "ws://api-v2.staging.bonde.org/graphql",
    options: { reconnect: true },
    webSocketImpl: window.WebSocket
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    link
  );
}

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link
});
