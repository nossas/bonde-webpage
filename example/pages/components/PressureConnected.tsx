import { connect } from 'react-redux'
import { PressurePlugin, asyncPressureCreate } from 'bonde-webpages'

const mapDispatchToProps = { asyncFillWidget: asyncPressureCreate }

export default connect(undefined, mapDispatchToProps)(PressurePlugin)