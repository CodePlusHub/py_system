// src/components/blocks/CTABlock.jsx
import React from 'react';

const CTABlock = ({ data, onChange }) => {
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder="نص الزر"
        className="w-full mb-2 p-2 border rounded"
        value={data.label}
        onChange={(e) => onChange({ ...data, label: e.target.value })}
      />
      <input
        type="text"
        placeholder="رابط الزر"
        className="w-full p-2 border rounded"
        value={data.link}
        onChange={(e) => onChange({ ...data, link: e.target.value })}
      />
      {data.label && (
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          {data.label}
        </a>
      )}
    </div>
  );
};

export default CTABlock;
