import React, { useState, useEffect } from 'react';
import EditorUtils from '../EditorUtils';
import ColorPickerButton from './ColorPickerButton';
import { Wrapper } from './styles';

const onChangeColor = ({ color, editorState, setEditorState }: any) => {
  const targetSelection = editorState.getSelection();
  if (!targetSelection.isCollapsed()) {
    const editorStateWithColor = EditorUtils.toggleInlineStyle(
      editorState,
      `color: rgba(${color.r},${color.g},${color.b},${color.a});`
    );
    setEditorState(editorStateWithColor);
  }
};

const hasColorStyle = (editorState: any) => {
  const hasStyle = editorState
    .getCurrentInlineStyle()
    .filter((style: any) => style.startsWith('color'));
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

  const changeColor = (editorState: any) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const color = currentStyle
      .filter((value: any) => value.startsWith('color'))
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
    <Wrapper className="colorControls">
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
    </Wrapper>
  );
};

export default ColorControls;
