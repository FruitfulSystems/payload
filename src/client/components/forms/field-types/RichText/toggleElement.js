import { Transforms } from 'slate';
import isElementActive from './isElementActive';
import listTypes from './listTypes';

const toggleElement = (editor, format) => {
  const isActive = isElementActive(editor, format);
  const isList = listTypes.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => listTypes.includes(n.type),
    split: true,
  });

  let type = format;

  if (isActive) {
    type = 'p';
  } else if (isList) {
    type = 'li';
  }

  Transforms.setNodes(editor, { type });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export default toggleElement;
