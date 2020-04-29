import React from 'react';
import { connect } from 'react-redux';
import {
  PressureAnalytics,
  PressurePlugin,
  PressureTellAFriend,
  FinishMessageCustom,
  asyncPressureCreate
} from 'bonde-webpages';
import Utils from '../../Utils';

const mapDispatchToProps = { asyncFillWidget: asyncPressureCreate };

const PressureConnected = connect(null, mapDispatchToProps)(PressurePlugin);

export default (props: any) =>
  <PressureConnected
    {...props}
    analyticsEvents={PressureAnalytics}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PressureTellAFriend,
        props: { imageUrl: Utils.imageUrl, href: Utils.getSharedPath(props.mobilization) }
      }
    }}
  />