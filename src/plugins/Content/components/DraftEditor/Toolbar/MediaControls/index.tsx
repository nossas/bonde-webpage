import React from 'react';

import { Entity, AtomicBlockUtils } from 'draft-js';

import InsertImageButton from './InsertImageButton';
import InsertScriptButton from './InsertScriptButton';

import './styles.scss';

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: any) => void;
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
};

const MediaControls = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
  popoverClassName,
}: Props) => {
  const handleInsertMedia = (mediaType, source) => {
    const entityKey = Entity.create(mediaType, 'IMMUTABLE', { src: source });
    const editorStateWithMedia = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    setEditorState(editorStateWithMedia);

    focusEditor();
  };

  return (
    <div className="mediaControls">
      <InsertImageButton
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        handleUploadFinish={source => handleInsertMedia('image', source)}
      />
      <InsertScriptButton
        buttonClassName={buttonClassName}
        popoverClassName={popoverClassName}
        handleInsertScript={handleInsertMedia}
      />
    </div>
  );
};

export default MediaControls;
