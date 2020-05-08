import { connect } from 'react-redux';
// import { injectIntl } from 'react-intl'
// import FormPlugin from '../../../src/plugins/Form'
// import { asyncFormEntryCreate } from '../../../src/redux/action-creators'

import {
  FormPlugin,
  asyncFormEntryCreate,
  FormAnalytics,
  FormTellAFriend,
  FinishMessageCustom,
} from 'bonde-webpages';
import Utils from '../../Utils';

const mapDispatchToProps = { asyncFormEntryCreate };

export default connect(
  undefined,
  mapDispatchToProps
)((props: any) => {
  return (
    <FormPlugin
      {...props}
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
