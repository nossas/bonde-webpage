import { connect } from 'react-redux';
import {
  PhonePressurePlugin,
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
)(PhonePressurePlugin);
