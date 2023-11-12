import React, { useEffect } from 'react';
import { WebviewMessage } from '../ext-src/extension';
import { GlobalNav } from './foundation/components/GlobalNav';
import { LandingLoader } from './foundation/components/LandingLoader';
import { Main } from './foundation/components/Main';
import { JsonDiagram } from './json-diagram/components/JsonDiagram';
import { NodeDetailPanel } from './node-detail/components/NodeDetailPanel';
import { useJsonEngineStore } from './store/json-engine/json-engine.store';
import { useSettingsStore } from './store/settings/settings.store';

const App: React.FC = () => {
  const setStringifiedJson = useJsonEngineStore((state) => state.setStringifiedJson);
  const initSettings = useSettingsStore((state) => state.initSettings);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data as WebviewMessage;

      if (message.command === 'json') {
        setStringifiedJson(message.jsonData);
      }

      if (message.command === 'init-settings') {
        initSettings(message.settings);
      }
    });
  }, []);

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
