import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import ExampleNav from './components/ExampleNav';

// Import all example components dynamically
const examples = {
  'basic-usage': React.lazy(() => import('../examples/basic-usage')),
  'grouped-table': React.lazy(() => import('../examples/grouped-table')),
  'expandable-table': React.lazy(() => import('../examples/expandable-table')),
  'custom-cells-table': React.lazy(() => import('../examples/custom-cells-table')),
  'full-featured-table': React.lazy(() => import('../examples/full-featured-table')),
  'virtual-non-virtual-table': React.lazy(() => import('../examples/virtual-non-virtual-table')),
  'editable-non-editable-cells': React.lazy(() => import('../examples/editable-non-editable-cells')),
};

const App = () => {
  const [currentExample, setCurrentExample] = useState(() => {
    const hash = window.location.hash.substring(1);
    return hash in examples ? hash : 'basic-usage'; // Default to basic-usage
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash in examples) {
        setCurrentExample(hash);
      } else {
        setCurrentExample('basic-usage'); // Fallback
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectExample = (path: string) => {
    window.location.hash = path;
  };

  const CurrentExampleComponent = examples[currentExample as keyof typeof examples];

  const exampleList = Object.keys(examples).map((key) => ({
    path: key,
    name: key.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // Format name for display
  }));

  return (
    <div>
      <ExampleNav examples={exampleList} onSelect={handleSelectExample} />
      <div style={{ padding: '20px' }}>
        <React.Suspense fallback={<div>Loading example...</div>}>
          {CurrentExampleComponent && <CurrentExampleComponent />}
        </React.Suspense>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);