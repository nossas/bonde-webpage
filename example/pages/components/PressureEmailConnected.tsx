import { connect } from 'react-redux';
import {
  EmailPressurePlugin,
  asyncFillWidget,
  selectors as MobSelectors,
} from 'bonde-webpages';

const mapDispatchToProps = { asyncFillWidget };

const mapStateToProps = (state: any) =>
  MobSelectors(state).getMobilizationLink();

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FormPlugin))
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailPressurePlugin);

// widget
// mobilization
// block
