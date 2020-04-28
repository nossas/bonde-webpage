import { connect } from 'react-redux'
import {
  asyncPressureCreate,
  PressurePlugin,
  selectors as MobSelectors
} from 'bonde-webpages'

const mapDispatchToProps = { asyncFillWidget: asyncPressureCreate }

const mapStateToProps = (state: any) => MobSelectors(state).getMobilizationLink()

export default connect(mapStateToProps, mapDispatchToProps)(PressurePlugin)