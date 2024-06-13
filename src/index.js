import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Application from './application';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Application />
  </StrictMode>
);
