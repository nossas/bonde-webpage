import { useState } from 'react';
import { connect } from 'react-redux';
import {
  PhonePressurePlugin,
  asyncFillWidget,
  selectors as MobSelectors,
} from 'bonde-webpages';
import { gql } from '@apollo/client';
import { client } from "../../graphql-app";

export const addTwilioCall = gql`
  mutation addTwilioCall(
    $widgetId: Int!
    $communityId: Int!
    $from: String!
    $to: String!
  ) {
    addTwilioCall(
      input: {
        call: {
          widgetId: $widgetId
          communityId: $communityId
          from: $from
          to: $to
        }
      }
    ) {
      twilioCall {
        id
        widgetId
        activistId
        twilioAccountSid
        twilioCallSid
        from
        to
        data
        createdAt
        updatedAt
        communityId
      }
    }
  }
`;

export const watchTwilioCallTransitions = gql`
  query watchTwilioCallTransitions($widgetId: Int!, $from: String!) {
    watchTwilioCallTransitions(call: { widgetId: $widgetId, from: $from }) {
      widgetId
      activistId
      twilioCallId
      twilioCallAccountSid
      twilioCallCallSid
      twilioCallFrom
      twilioCallTo
      twilioCallTransitionId
      twilioCallTransitionSequenceNumber
      twilioCallTransitionStatus
      twilioCallTransitionCallDuration
      twilioCallTransitionCreatedAt
      twilioCallTransitionUpdatedAt
    }
  }
`;

export const countTwilioCallsByWidget = gql`
  query CountTwilioCallsByWidget($widgetId: Int!) {
    allTwilioCalls(condition: { widgetId: $widgetId }) {
      totalCount
    }
  }
`;

const TwilioCall = ({ children }) => {
  const [phonePressureCount, setPhonePressureCount] = useState(0);
  const [callTransition, setCallTransition] = useState<any>(null);
  const [observableQuery, setObservableQuery] = useState<any>(null);

  const call = (variables: any, watchQuery: boolean = false) => {
    setPhonePressureCount(phonePressureCount + 1);
    return client.mutate({ mutation: addTwilioCall, variables })
      .then(() => {
        if (watchQuery && !observableQuery) {
          const observable = client.watchQuery({
            pollInterval: 2000,
            query: watchTwilioCallTransitions,
            variables: { widgetId: variables.widgetId, from: variables.from }
          });
          observable.subscribe({
            next: ({
              data: { watchTwilioCallTransitions: transitions }
            }: any) => {
              setCallTransition(transitions);
            }
          });
          setObservableQuery(observable);
        }
      });
  };

  return children({
    call,
    callTransition,
    observableQuery,
    phonePressureCount
  });
}

const mapDispatchToProps = { asyncFillWidget };

const mapStateToProps = (state: any) =>
  MobSelectors(state).getMobilizationLink();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => (
  <TwilioCall>
    {(twilio: any) => (
      <PhonePressurePlugin
        {...props}
        twilio={twilio}
      />
    )}
  </TwilioCall>
));
