import React, { useState } from 'react';

type ComponentProps = {
  phonePressureCount: number;
  addPhonePressureCount: (param: number) => void;
  twilioCall: (variables: any, watchQuery: boolean) => any;
  callTransition: any;
  countTwilioCallsByWidget: (id: number) => any;
};

type Props = {
  /* Below props are passed from root parent */
  mobilization: Record<any, any>;
  block: Record<any, any>;
  analyticsEvents: any;
  editable: boolean;
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
  PluginComponent: ({
    callTransition,
    phonePressureCount,
    addPhonePressureCount,
    twilioCall,
    countTwilioCallsByWidget,
  }: ComponentProps) => JSX.Element;
};

const countTwilioCallsByWidget = (variables: any) => {
  // return graphqlClient
  //   .query({
  //     query: graphqlQueries.countTwilioCallsByWidget,
  //     variables,
  //   })
  //   .then(
  //     ({
  //       data: {
  //         allTwilioCalls: { totalCount: phonePressureCount },
  //       },
  //     }: any) => {
  //       return Promise.resolve({ phonePressureCount });
  //     }
  //   );
  return variables;
};

const Connected = ({ PluginComponent, ...props }: Props) => {
  // const [observableQuery, setObservableQuery] = useState(undefined);
  const [callTransition, setTransition] = useState<any>(undefined);
  const [phonePressureCount, addPhonePressureCount] = useState(0);

  const handleTwilioCall = (variables: any, watchQuery: boolean = false) => {
    addPhonePressureCount(phonePressureCount + 1);
    // return graphqlClient
    //   .mutate({
    //     mutation: graphqlMutations.addTwilioCall,
    //     variables,
    //   })
    //   .then(() => {
    //     if (watchQuery && !observableQuery) {
    //       const observableQuery = graphqlClient.watchQuery({
    //         pollInterval: 2000,
    //         query: graphqlQueries.watchTwilioCallTransitions,
    //         variables: { widgetId: variables.widgetId, from: variables.from },
    //       });
    //       observableQuery.subscribe({
    //         next: ({
    //           data: { watchTwilioCallTransitions: callTransition },
    //         }: any) => {
    //           setTransition(callTransition);
    //         },
    //       });
    //       setObservableQuery(observableQuery);
    //     }
    //   });
    console.log({ variables, watchQuery });
    setTransition({ variables, watchQuery });
  };

  return (
    <PluginComponent
      {...props}
      phonePressureCount={phonePressureCount}
      addPhonePressureCount={addPhonePressureCount}
      callTransition={callTransition}
      twilioCall={handleTwilioCall}
      countTwilioCallsByWidget={countTwilioCallsByWidget}
    />
  );
};

export default Connected;
