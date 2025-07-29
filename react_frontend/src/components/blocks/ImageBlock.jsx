// src/components/blocks/ImageBlock.jsx
import React from 'react';

const ImageBlock = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="رابط الصورة"
    style={{ width: '100%' }}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default ImageBlock;
