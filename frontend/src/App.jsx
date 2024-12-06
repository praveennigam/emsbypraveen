import React from 'react';
import { EmpProvider } from './components/emp/EmpContext';
import EmpRoute from './components/emp/EmpRoute';

const App = () => {
  return (
    <EmpProvider>
      <EmpRoute />
    </EmpProvider>
  );
};

export default App;
