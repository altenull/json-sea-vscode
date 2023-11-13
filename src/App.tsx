import React from 'react';
import { GlobalNav } from './foundation/components/GlobalNav';
import { LandingLoader } from './foundation/components/LandingLoader';
import { Main } from './foundation/components/Main';
import { JsonDiagram } from './json-diagram/components/JsonDiagram';
import { NodeDetailPanel } from './node-detail/components/NodeDetailPanel';
import { useVsCodeBridge } from './useVsCodeBridge';

const App: React.FC = () => {
  useVsCodeBridge();

  return (
    <>
      <LandingLoader />

      <GlobalNav />

      <Main>
        <JsonDiagram />
        <NodeDetailPanel />
      </Main>
    </>
  );
};

export default App;
