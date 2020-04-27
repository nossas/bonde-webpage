import { connect } from 'react-redux'
import { PressurePlugin, asyncPressureCreate } from 'bonde-webpages'

const mapDispatchToProps = { fillWidget: asyncPressureCreate }

export default connect(undefined, mapDispatchToProps)(PressurePlugin)