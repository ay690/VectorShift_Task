import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <div className="app-header">
          VectorShift Pipeline Builder
        </div>
        <PipelineToolbar />
        <div className="canvas-container">
          <PipelineUI />
        </div>
        <div className="submit-container">
          <SubmitButton />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
