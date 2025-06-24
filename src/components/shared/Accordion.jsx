// src/components/shared/Accordion.jsx
import React, { useState } from 'react';
import './Accordion.css'; // We'll create this CSS file

// 'title' is the visible header. 'children' will be the content inside (e.g., checkboxes).
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true); // Default to open

  return (
    <div className="accordion-group">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;