import React from 'react';
import './App.css';
import Canvas from './components/Canvas/'
import Toolbar from './components/Toolbar/'
import SecondaryToolbar from './components/SecondaryToolbar/'
import CanvasProvider from './utils/CanvasProvider'

function App() {
  return (
    <div className="App">
      <CanvasProvider>
        <Toolbar />
        <SecondaryToolbar />
        <Canvas height="400px" width="400px" />
      </CanvasProvider>
    </div>
  );
}

export default App;
