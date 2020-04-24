import React, { useState } from 'react';
import PressureGraphQL from './plugin.graphql';

type Props = {
  /* Below props are passed from root parent */
  fillWidget: (param: any) => Promise<any>;
  graphqlClient: any;
  mobilization: Record<any, any>;
  block: Record<any, any>;
  analyticsEvents: any;
  editable: boolean;
  overrides: {
    FinishCustomMessage: {
      component: any;
      props: any;
    };
    FinishDefaultMessage: {
      component: any;
      props: any;
    };
  };
};

const Connected = ({ fillWidget, ...props }: Props) => {
  const [saving, toggleSavingStatus] = useState(false);
  const [filledPressureWidgets, setFilledPressureWidgets] = useState<
    Array<any>
  >([]);

  const handleFillWidget = (params: any) => {
    toggleSavingStatus(true);
    return fillWidget(params).then(
      ({ widget }: { widget: { id: number | string } }) => {
        toggleSavingStatus(false);
        setFilledPressureWidgets([...filledPressureWidgets, widget.id]);
        return Promise.resolve();
      }
    );
  };

  console.log({ fillWidget, props }, 'connected');

  return (
    <PressureGraphQL
      {...props}
      asyncFillWidget={handleFillWidget}
      saving={saving}
      filledPressureWidgets={filledPressureWidgets}
    />
  );
};

export default Connected;
