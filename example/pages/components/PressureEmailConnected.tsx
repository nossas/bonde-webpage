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

const pressure = async ({ payload, widget }: any): Promise<any> => {
  const { activist } = payload;
  try {
    let input: any = {
      first_name: activist.firstname,
      last_name: activist.lastname,
      name: `${activist.firstname} ${activist.lastname}`,
      email: activist.email
    };
    if (activist.city) {
    input.city = activist.city;
  };
  
  const query = JSON.stringify({
    query: `mutation Pressure ($activist: ActivistInput!, $widget_id: Int!) {
      create_email_pressure(
        widget_id: $widget_id,
        activist: $activist
        ) {
          data
        }
      }`,
      variables: { activist: input, widget_id: widget.id }
    });
    console.log('responseJSON', query);
    const response = await fetch('https://api-graphql.staging.bonde.org/v1/graphql', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: query,
    });
    
    const responseJson = await response.json();
    console.log('responseJSON', responseJson);
    return responseJson.data;
  } catch (err) {
    console.log('pressure err', err);
  }
};

const mapDispatchToProps = () => ({ asyncFillWidget: pressure });

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