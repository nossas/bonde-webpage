import fetch from 'node-fetch';
import { connect } from 'react-redux';

import {
  EmailPressurePlugin,
  // asyncFillWidget,
  selectors as MobSelectors,
  PressureAnalytics,
  FinishMessageCustom,
  PressureTellAFriend,
} from '../../bonde-webpage';
import Utils from '../../Utils';

// import { pressure } from '../../activists';
// import graphql from '../../activists/request-graphql';
// import { client } from '../../graphql-app';

const mapDispatchToProps = () => ({
  asyncFillWidget: async (args: any) =>
    (
      await fetch('/api/actions/pressure', {
        method: 'post',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),

  asyncFetchTargets: async (args: any) =>
    (
      await fetch('/api/data/targets', {
        method: 'post',
        body: JSON.stringify(args),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),
});

const mapStateToProps = (state: any) => ({
  ...MobSelectors(state).getMobilizationLink(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props: any) => (
  <EmailPressurePlugin
    {...props}
    analyticsEvents={PressureAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PressureTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
  />
));
