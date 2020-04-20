import React, { useState, useEffect } from 'react';
import { Entity } from 'draft-js';

import EditorUtils from '../EditorUtils';
import getSelectionEntities from '../getSelectionEntities';

const getSelectionLink = editorState => {
  // Return entity when one and only one selected
  return getSelectionEntities(editorState, 'LINK').last();
};

type Props = {
  editorState: Record<any, any>;
  setEditorState: (param: any) => void;
  focusEditor: () => void;
  buttonClassName?: string;
  popoverClassName?: string;
};

const LinkControls = ({
  editorState,
  setEditorState,
  focusEditor,
  buttonClassName,
  popoverClassName,
}: Props) => {
  const [showInput, toggleShowInput] = useState(false);
  const [href, setHref] = useState('false');
  const [target, setTarget] = useState('_self');
  const [hasLink, toggleLink] = useState(false);

  const changeState = () => {
    const entityLink = getSelectionLink(editorState);
    const nextEntityLink = getSelectionLink(editorState);
    if (nextEntityLink && nextEntityLink !== entityLink) {
      const entityInstance = Entity.get(nextEntityLink.entityKey);
      const { href, target } = entityInstance.getData();
      setTarget(target);
      setHref(href);
      toggleLink(true);
    } else {
      setTarget('_self');
      setHref('href');
      toggleLink(false);
    }
  };

  useEffect(() => {
    return changeState();
  }, [editorState]);

  const confirmLink = () => {
    if (href) {
      setEditorState(EditorUtils.toggleLink(editorState, { href, target }));
    } else {
      setEditorState(EditorUtils.toggleLink(editorState, null));
    }
    toggleShowInput(false);
    return focusEditor();
  };

  const removeLink = () => {
    setEditorState(EditorUtils.toggleLink(editorState, null));
    return focusEditor();
  };

  const handleChangeTarget = e =>
    setTarget(e.target.checked ? '_blank' : '_self');

  return (
    <div className="linkControls">
      <button
        className={`${buttonClassName} ${hasLink ? 'active' : null}`}
        onClick={() => toggleShowInput(!showInput)}
      >
        <i className="fa fa-link" />
      </button>
      {showInput && (
        <div className={popoverClassName}>
          <div className="flex flex-wrap">
            <input
              type="text"
              value={href}
              onChange={e => setHref(e.target.value)}
              className="input col-8 m0"
            />
            <button className="btn btn-outline white mx1" onClick={confirmLink}>
              <i className="fa fa-check" />
            </button>
          </div>
          <div className="flex flex-wrap mt1">
            <input
              id="targetId"
              type="checkbox"
              onChange={handleChangeTarget}
              value={target}
              checked={target === '_blank'}
              data-wysihtml5-dialog-field="target"
            />
            <label
              htmlFor="targetId"
              style={{ cursor: 'pointer', lineHeight: 'normal' }}
            >
              Abrir link em nova aba
            </label>
          </div>
        </div>
      )}
      <button className={buttonClassName} onClick={removeLink}>
        <i className="fa fa-unlink" />
      </button>
    </div>
  );
};

export default LinkControls;
