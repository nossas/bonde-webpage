import React from 'react';

import { RichUtils } from 'draft-js';

import Media from './MediaControls/Media';
import ColorControls from './ColorControls';
import FontControls from './FontControls';
import HistoryControls from './HistoryControls';
import LinkControls from './LinkControls';
import AlignmentControls from './AlignmentControls';
import MediaControls from './MediaControls';
import EditorUtils from './EditorUtils';

import './styles.scss';

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: any) => void;
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
  theme?: string;
  style: Record<string, string>;
};

const Toolbar = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
  popoverClassName,
  theme,
  style,
}: Props) => {
  const toggleInlineStyle = style => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    return focusEditor();
  };

  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    return focusEditor();
  };

  const hasInlineStyle = inlineStyle => {
    const hasStyle = editorState
      .getCurrentInlineStyle()
      .filter(style => style === inlineStyle);
    return hasStyle.size > 0 ? 'active' : null;
  };

  const hasBlockType = blockType => {
    const selectionState = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selectionState.getStartKey());
    return block.getType() === blockType ? 'active' : null;
  };

  const controlsProps = { editorState, setEditorState, focusEditor };

  return (
    <div
      className="toolbar absolute full-width top-0 left-0 bg-darken-4 flex flex-wrap"
      style={style}
    >
      <div>
        {/* InlineStyle buttons */}
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('BOLD')}`}
          onClick={() => toggleInlineStyle('BOLD')}
        >
          <i className="fa fa-bold" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('ITALIC')}`}
          onClick={() => toggleInlineStyle('ITALIC')}
        >
          <i className="fa fa-italic" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasInlineStyle('UNDERLINE')}`}
          onClick={() => toggleInlineStyle('UNDERLINE')}
        >
          <i className="fa fa-underline" />
        </button>
        {/* BlockType buttons */}
        <button
          type="button"
          className={`${buttonClassName} ${hasBlockType('ordered-list-item')}`}
          onClick={() => toggleBlockType('ordered-list-item')}
        >
          <i className="fa fa-list-ol" />
        </button>
        <button
          type="button"
          className={`${buttonClassName} ${hasBlockType(
            'unordered-list-item'
          )}`}
          onClick={() => toggleBlockType('unordered-list-item')}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
      <LinkControls
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        {...controlsProps}
      />
      <ColorControls
        theme={theme}
        buttonClassName={buttonClassName}
        {...controlsProps}
      />
      <FontControls
        initialValue={{ fontSize: 15, fontFamily: '' }}
        {...controlsProps}
      />
      <HistoryControls buttonClassName={buttonClassName} {...controlsProps} />
      <AlignmentControls buttonClassName={buttonClassName} {...controlsProps} />
      <MediaControls
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        {...controlsProps}
      />
    </div>
  );
};

export const toolbarEditorProps = {
  blockRendererFn: block => EditorUtils.blockRendererFn(block, Media),
  customStyleFn: style => {
    return {
      ...EditorUtils.customSizeAndFamily(style),
      ...EditorUtils.customColor(style),
    };
  },
};

export default Toolbar;
