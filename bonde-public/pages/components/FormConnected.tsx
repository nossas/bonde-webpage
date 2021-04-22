import { connect } from 'react-redux';
// import { injectIntl } from 'react-intl'
// import FormPlugin from '../../../src/plugins/Form'
// import { asyncFormEntryCreate } from '../../../src/redux/action-creators'

import {
  FormPlugin,
  // asyncFormEntryCreate,
  FormAnalytics,
  FormTellAFriend,
  FinishMessageCustom,
} from 'bonde-webpages';
import Utils from '../../Utils';
import fetch from 'node-fetch';

const mapDispatchToProps = () => ({
  asyncFormEntryCreate: async (args: any) => (await fetch('/api/actions/form', {
    method: 'post',
    body: JSON.stringify(args),
    headers: { 'Content-Type': 'application/json' }
  })).json()
});

export default connect(
  undefined,
  mapDispatchToProps
)((props: any) => {
  return (
    <FormPlugin
      {...props}
      widget={{
        ...props.widget,
        settings: {
          ...props.widget.settings,
          fields: props.widget.settings.fields ? JSON.parse(props.widget.settings.fields) : []
        }
      }}
      analyticsEvents={FormAnalytics}
      overrides={{
        FinishCustomMessage: { component: FinishMessageCustom },
        FinishDefaultMessage: {
          component: FormTellAFriend,
          props: {
            imageUrl: Utils.imageUrl,
            href: Utils.getSharedPath(props.mobilization),
          },
        },
      }}
    />
  );
});
