import React from 'react';

interface ExampleNavProps {
  examples: { path: string; name: string }[];
  onSelect: (path: string) => void;
}

const ExampleNav: React.FC<ExampleNavProps> = ({ examples, onSelect }) => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {examples.map((example) => (
          <li key={example.path}>
            <a
              href={`#${example.path}`}
              onClick={() => onSelect(example.path)}
              style={{
                padding: '8px 12px',
                border: '1px solid #007bff',
                borderRadius: '5px',
                textDecoration: 'none',
                color: '#007bff',
                backgroundColor: window.location.hash === `#${example.path}` ? '#e0f7fa' : 'white',
              }}
            >
              {example.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ExampleNav;