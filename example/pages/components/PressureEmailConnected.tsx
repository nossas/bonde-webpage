import { connect } from 'react-redux';
import {
  EmailPressurePlugin,
  // asyncFillWidget,
  selectors as MobSelectors,
  PressureAnalytics,
  FinishMessageCustom,
  PressureTellAFriend
} from 'bonde-webpages';
import Utils from '../../Utils';
import { pressure } from '../../activists';
import { client } from '../../graphql-app';

const mapDispatchToProps = () => ({ asyncFillWidget: pressure });

const mapStateToProps = (state: any) => ({
  ...MobSelectors(state).getMobilizationLink(),
  client
});

export default connect(mapStateToProps, mapDispatchToProps)(
  (props: any) => (
    <EmailPressurePlugin
      {...props}
      analyticsEvents={PressureAnalytics}
      overrides={{
        FinishCustomMessage: { component: FinishMessageCustom },
        FinishDefaultMessage: {
          component: PressureTellAFriend,
          props: { imageUrl: Utils.imageUrl, href: Utils.getSharedPath(props.mobilization) }
        }
      }}
    />
  )
);