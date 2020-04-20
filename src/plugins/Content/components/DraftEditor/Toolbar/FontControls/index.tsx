import React, { useState, useEffect } from 'react';
import EditorUtils from '../EditorUtils';
import SelectFontFamily from './SelectFontFamily';
import './styles.scss';

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: boolean) => void;
  focusEditor: () => void;
  initialValue?: {
    fontSize: number;
    fontFamily: string;
  };
};

const FontControls = ({
  focusEditor,
  editorState,
  setEditorState,
  ...props
}: Props) => {
  const [initialValues, setState] = useState({ ...props.initialValue });

  const changeStyles = () => {
    const hasChangeInlineStyle =
      editorState.getCurrentInlineStyle() !==
      editorState.getCurrentInlineStyle();

    if (hasChangeInlineStyle) {
      const currentStyle = editorState.getCurrentInlineStyle();
      setState({ ...EditorUtils.customSizeAndFamily(currentStyle) });
    }
  };

  useEffect(() => {
    changeStyles();
  }, [editorState]);

  const handleChangeSize = e => {
    const fontSize = e.target.value;

    if (fontSize) {
      const editorStateWithFontSize = EditorUtils.toggleInlineStyle(
        editorState,
        `font-size: ${fontSize}px;`
      );
      setEditorState(editorStateWithFontSize);
      setState({
        ...initialValues,
        fontSize,
      });
    }
  };

  const handleChangeFont = e => {
    const fontFamily = e.target.value;

    const editorStateWithFontFamily = EditorUtils.toggleInlineStyle(
      editorState,
      `font-family: ${fontFamily};`
    );
    setEditorState(editorStateWithFontFamily);
    setState({
      ...initialValues,
      fontFamily,
    });
  };

  const handleMouseOut = () => focusEditor();

  return (
    <div className="font-controls">
      <input
        type="number"
        value={initialValues.fontSize}
        onChange={handleChangeSize}
        onMouseOut={handleMouseOut}
        className="font-controls-size input col col-3 h5 mx1"
      />
      <SelectFontFamily
        onChange={handleChangeFont}
        value={initialValues.fontFamily}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
};

export default FontControls;
