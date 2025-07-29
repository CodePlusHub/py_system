// src/components/BlockEditorWithSidebar.jsx
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import './BlockEditor.css';

const BlockTypes = [
  { type: 'text', label: '📝 فقرة' },
  { type: 'image', label: '🖼️ صورة' }
];

const DraggableBlockSource = ({ type, label }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `source-${type}`,
    data: { fromSource: true, type }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="block-source-item"
      style={{ opacity: isDragging ? 0.4 : 1, cursor: 'grab' }}
    >
      {label}
    </div>
  );
};

const BlockCard = ({ block, updateContent, deleteBlock }) => (
  <div className="block-card">
    <div className="block-preview">
      {block.type === 'text' && (
        <textarea
          rows="3"
          style={{ width: '100%' }}
          placeholder="اكتب هنا..."
          value={block.content}
          onChange={(e) => updateContent(block.id, e.target.value)}
        />
      )}
      {block.type === 'image' && (
        <input
          type="text"
          placeholder="رابط الصورة"
          style={{ width: '100%' }}
          value={block.content}
          onChange={(e) => updateContent(block.id, e.target.value)}
        />
      )}
    </div>
    <div className="block-controls">
      <button onClick={() => deleteBlock(block.id)}>🗑 حذف</button>
    </div>
  </div>
);

const BlockEditorWithSidebar = () => {
  const [blocks, setBlocks] = useState([]);
  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const updateContent = (id, content) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: 'editor-zone' });

  const handleDragStart = (event) => {
    setActiveDragItem(event.active);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over || over.id !== 'editor-zone') return;

    if (active.data?.current?.fromSource) {
      const type = active.data.current.type;
      const newBlock = { id: Date.now().toString(), type, content: '' };
      setBlocks([...blocks, newBlock]);
    }
  };

  return (
    <div className="editor-layout">
      <div className="block-sidebar">
        <h3>➕ اسحب بلوك</h3>
        {BlockTypes.map(bt => (
          <DraggableBlockSource key={bt.type} type={bt.type} label={bt.label} />
        ))}
      </div>

      <div className="block-editor">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="blocks-container"
            id="editor-zone"
            ref={setDropRef}
            style={{
              border: isOver ? '2px dashed green' : '2px dashed #ccc',
              minHeight: '300px',
              padding: '20px',
              backgroundColor: isOver ? '#f0fff0' : '#fefefe'
            }}
          >
            {blocks.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                updateContent={updateContent}
                deleteBlock={deleteBlock}
              />
            ))}
          </div>

          <DragOverlay>
            {activeDragItem?.data?.current?.fromSource && (
              <div className="block-card overlay-preview">
                {activeDragItem.data.current.type === 'text' && <p>📝 نص</p>}
                {activeDragItem.data.current.type === 'image' && <p>🖼️ صورة</p>}
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default BlockEditorWithSidebar;
