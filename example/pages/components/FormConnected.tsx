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
import { formEntry } from '../../activists';

const mapDispatchToProps = { asyncFormEntryCreate: formEntry };

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
          fields: JSON.parse(props.widget.settings.fields)
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
