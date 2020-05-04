import React, { useState } from 'react';

type ComponentProps = {
  phonePressureCount: number;
  addPhonePressureCount: (param: number) => void;
  callTransition: any;
  twilioCall: (variables: any, watchQuery: boolean) => any;
  countTwilioCallsByWidget: (id: number) => any;
  asyncFillWidget: Function;
  saving: boolean;
  filledPressureWidgets: Array<any>;
};

type Props = {
  /* Below props are passed from root parent */
  fillWidget: (param: any) => Promise<any>;
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
    /*Phone Pressure Props*/
    callTransition,
    phonePressureCount,
    addPhonePressureCount,
    twilioCall,
    countTwilioCallsByWidget,
    /*Email Pressure Props*/
    asyncFillWidget,
    saving,
    filledPressureWidgets,
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

const Connected = ({ PluginComponent, fillWidget, ...props }: Props) => {
  // const [observableQuery, setObservableQuery] = useState(undefined);
  const [callTransition, setTransition] = useState<any>(undefined);
  const [phonePressureCount, addPhonePressureCount] = useState(0);
  const [saving, toggleSavingStatus] = useState(false);
  const [filledPressureWidgets, setFilledPressureWidgets] = useState<
    Array<any>
  >([]);

  const handleFillWidget = (params: any) => {
    toggleSavingStatus(true);
    return fillWidget(params).then(
      ({ widget }: { widget: { id: number | string } }) => {
        toggleSavingStatus(false);
        setFilledPressureWidgets([...filledPressureWidgets, widget.id]);
        return Promise.resolve();
      }
    );
  };

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
      asyncFillWidget={handleFillWidget}
      saving={saving}
      filledPressureWidgets={filledPressureWidgets}
      phonePressureCount={phonePressureCount}
      addPhonePressureCount={addPhonePressureCount}
      callTransition={callTransition}
      twilioCall={handleTwilioCall}
      countTwilioCallsByWidget={countTwilioCallsByWidget}
    />
  );
};

export default Connected;
