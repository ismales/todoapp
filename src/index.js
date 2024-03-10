import React from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/no-unresolved
import Application from './application';

const root = createRoot(document.getElementById('root'));

root.render(<Application />);
