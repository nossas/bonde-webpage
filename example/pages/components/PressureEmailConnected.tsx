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

const mapDispatchToProps = () => {
  return {
    asyncFillWidget: (payload: any) => {
      console.log('payload', payload);
    }
  };
};

const mapStateToProps = (state: any) =>
  MobSelectors(state).getMobilizationLink();

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