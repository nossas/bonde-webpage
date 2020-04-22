import { connect } from 'react-redux';
import PressurePlugin from '../../src/plugins/Pressure';
import { fillWidget } from '../../src/plugins/Pressure/redux/action-creators';
import { selectors as MobSelectors } from '../../src/redux'

const mapDispatchToProps = { fillWidget }

const mapStateToProps = state => {
  const query = MobSelectors(state)
  return query.getMobilizationLink()
}

export default connect(undefined, mapDispatchToProps)(PressurePlugin)