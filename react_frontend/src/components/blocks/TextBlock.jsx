// src/components/blocks/TextBlock.jsx
import React from 'react';

const TextBlock = ({ value, onChange }) => (
  <textarea
    rows="3"
    style={{ width: '100%' }}
    placeholder="نص..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default TextBlock;
