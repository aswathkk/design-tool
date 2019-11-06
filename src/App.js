import React from 'react';
import './App.css';
import Canvas from './components/Canvas/'
import Toolbar from './components/Toolbar/'
import CanvasProvider from './utils/CanvasProvider'

function App() {
  return (
    <CanvasProvider>
      <div className="App">
        <Toolbar />
        <Canvas height="400px" width="400px" />
      </div>
    </CanvasProvider>
  );
}

export default App;
