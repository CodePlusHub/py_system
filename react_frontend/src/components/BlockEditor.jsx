// src/components/BlockEditor.jsx
import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import './BlockEditor.css';

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const BlockEditor = () => {
  const [blocks, setBlocks] = useState([]);

  const addBlock = (type) => {
    const newBlock = { id: Date.now().toString(), type, content: '' };
    setBlocks([...blocks, newBlock]);
  };

  const updateContent = (id, content) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over?.id);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const renderBlock = (block) => {
    const commonProps = {
      value: block.content,
      onChange: (value) => updateContent(block.id, value),
    };

    return (
      <div className="block-card">
        <div className="block-preview">
          {block.type === 'text' && <TextBlock {...commonProps} />}
          {block.type === 'image' && <ImageBlock {...commonProps} />}
        </div>
        <div className="block-controls">
          <button onClick={() => deleteBlock(block.id)}>🗑 حذف</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="block-toolbar">
        <button onClick={() => addBlock('text')}>📝 إضافة فقرة</button>
        <button onClick={() => addBlock('image')}>🖼️ إضافة صورة</button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          <div className="blocks-container">
            {blocks.map((block) => (
              <SortableItem key={block.id} id={block.id}>
                {renderBlock(block)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default BlockEditor;