import React from 'react';
// import BlockEditor from './components/BlockEditor';
import BlockEditorWithSidebar from './components/BlockEditorWithSidebar';

const App = () => {
  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h2>🎨 منشئ المقالات (Gutenberg Style)</h2>
      {/* <BlockEditor /> */}
      <BlockEditorWithSidebar />
    </div>
  );
};

export default App;
