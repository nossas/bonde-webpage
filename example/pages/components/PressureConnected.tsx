import { connect } from 'react-redux';
import PressurePlugin from '../../../src/plugins/Pressure';
import { fillWidget } from '../../../src/plugins/Pressure/redux/action-creators';
// import { selectors as MobSelectors } from '@bonde-webpage/redux';

const mapDispatchToProps = { fillWidget }

// const mapStateToProps = (state: any) => {
//   const query = MobSelectors(state)
//   return query.getMobilizationLink()
// }

export default connect(undefined, mapDispatchToProps)(PressurePlugin)