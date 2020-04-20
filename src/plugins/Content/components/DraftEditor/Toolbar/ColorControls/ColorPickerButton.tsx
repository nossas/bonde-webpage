import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import themes from '../themes';

type Props = {
  color?: {
    rgb: {};
  };
  onRemoveColor: () => void;
  onChangeColor: (color) => void;
  focusEditor: () => void;
  className?: string;
  theme?: string;
};

const ColorPickerButton = ({
  className,
  theme,
  color,
  onChangeColor,
}: Props) => {
  const [showColorPicker, setColorPicker] = useState(false);

  const toggleColorPicker = () => setColorPicker(!showColorPicker);

  const handleChangeColor = focusEditor => {
    setColorPicker(false);
    focusEditor();
  };

  const presetColors = theme ? themes[theme] : [];

  const colorPickerProps = {
    color,
    presetColors,
    onChangeComplete: () => onChangeColor(color.rgb),
  };

  return (
    <div>
      <button type="button" className={className} onClick={toggleColorPicker}>
        <i className="fa fa-eyedropper" />
      </button>
      {showColorPicker ? (
        <div className="absolute left-0">
          <SketchPicker {...colorPickerProps} />
          <button
            className="btn bg-darken-4 white col-12 rounded-bottom"
            onClick={handleChangeColor}
          >
            Fechar
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ColorPickerButton;
