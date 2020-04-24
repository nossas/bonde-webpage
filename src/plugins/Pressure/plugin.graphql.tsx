import React, { useState } from 'react';
import * as graphqlMutations from './graphql/mutations';
import * as graphqlQueries from './graphql/queries';
import PressurePlugin from '.';

type Props = {
  /* Below props are from root parent */
  mobilization: any;
  block: any;
  analyticsEvents: any;
  editable: boolean;
  graphqlClient: any;
  overrides: {
    FinishCustomMessage: {
      component: any;
      props: any;
    };
    FinishDefaultMessage: {
      component: any;
      props: any;
    };
  };

  /* Below props are created in direct parent */
  asyncFillWidget: Function;
  saving: boolean;
  filledPressureWidgets: Array<any>;
};

const PressureGraphQL = ({ graphqlClient, ...props }: Props) => {
  const [observableQuery, setObservableQuery] = useState(undefined);
  const [callTransition, setTransition] = useState(undefined);
  const [phonePressureCount, addPhonePressureCount] = useState(0);

  const handleTwilioCall = (variables: any, watchQuery: boolean = false) => {
    addPhonePressureCount(phonePressureCount + 1);
    return graphqlClient
      .mutate({
        mutation: graphqlMutations.addTwilioCall,
        variables,
      })
      .then(() => {
        if (watchQuery && !observableQuery) {
          const observableQuery = graphqlClient.watchQuery({
            pollInterval: 2000,
            query: graphqlQueries.watchTwilioCallTransitions,
            variables: { widgetId: variables.widgetId, from: variables.from },
          });
          observableQuery.subscribe({
            next: ({
              data: { watchTwilioCallTransitions: callTransition },
            }: any) => {
              setTransition(callTransition);
            },
          });
          setObservableQuery(observableQuery);
        }
      });
  };

  return (
    <PressurePlugin
      {...props}
      callTransition={callTransition}
      twilioCall={handleTwilioCall}
      countTwilioCallsByWidget={(variables: any) => {
        return graphqlClient
          .query({
            query: graphqlQueries.countTwilioCallsByWidget,
            variables,
          })
          .then(
            ({
              data: {
                allTwilioCalls: { totalCount: phonePressureCount },
              },
            }: any) => {
              return Promise.resolve({ phonePressureCount });
            }
          );
      }}
    />
  );
};

export default PressureGraphQL;
