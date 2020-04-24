import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// import FormPlugin from '../../../src/plugins/Form'
// import { asyncFormEntryCreate } from '../../../src/redux/action-creators'
import {
  FormPlugin,
  asyncFormEntryCreate,
  selectors as MobSelectors
} from 'bonde-webpages'

const mapDispatchToProps = { asyncFormEntryCreate }

const mapStateToProps = (state: any) => MobSelectors(state).getMobilizationLink()

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FormPlugin))