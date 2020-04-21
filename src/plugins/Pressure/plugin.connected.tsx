import React, { useState } from 'react';
import PressureGraphQL from './plugin.graphql';

type Props = {
  graphqlClient: any;
  fillWidget: (param: any) => Promise<any>;
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
