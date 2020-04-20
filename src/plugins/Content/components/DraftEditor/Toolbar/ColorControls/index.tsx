import React, { useState, useEffect } from 'react';
import EditorUtils from '../EditorUtils';
import ColorPickerButton from './ColorPickerButton';
import './styles.scss';

const onChangeColor = ({ color, editorState, setEditorState }) => {
  const targetSelection = editorState.getSelection();
  if (!targetSelection.isCollapsed()) {
    const editorStateWithColor = EditorUtils.toggleInlineStyle(
      editorState,
      `color: rgba(${color.r},${color.g},${color.b},${color.a});`
    );
    setEditorState(editorStateWithColor);
  }
};

const hasColorStyle = editorState => {
  const hasStyle = editorState
    .getCurrentInlineStyle()
    .filter(style => style.startsWith('color'));
  return hasStyle.size > 0 ? 'active' : null;
};

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: any) => void;
  focusEditor: () => void;
  buttonClassName?: string;
  theme?: string;
};

const ColorControls = ({
  editorState,
  buttonClassName,
  theme,
  setEditorState,
  focusEditor,
}: Props) => {
  const [color, setColor] = useState({ rgb: {} });

  const changeColor = editorState => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const color = currentStyle
      .filter(value => value.startsWith('color'))
      .last();
    if (color) {
      setColor(
        color
          .replace('color:')
          .replace(';', '')
          .trim()
      );
    }
  };

  useEffect(() => {
    changeColor(editorState);
  }, [editorState]);

  return (
    <div className="colorControls">
      <ColorPickerButton
        theme={theme}
        className={`${buttonClassName} ${hasColorStyle(editorState)}`}
        color={color}
        onRemoveColor={() => {}}
        onChangeColor={color =>
          onChangeColor({ color, editorState, setEditorState })
        }
        focusEditor={focusEditor}
      />
    </div>
  );
};

export default ColorControls;
