import { useEffect } from 'react';
import { WebviewMessage } from '../ext-src/extension';
import { SingletonAcquireVsCodeService } from './services/singleton-acquire-vscode-service';
import { useJsonEngineStore } from './store/json-engine/json-engine.store';
import { useSettingsStore } from './store/settings/settings.store';
import { isValidJson } from './utils/json.util';

export function useVsCodeBridge() {
  const setStringifiedJson = useJsonEngineStore((state) => state.setStringifiedJson);
  const initSettings = useSettingsStore((state) => state.initSettings);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data as WebviewMessage;

      if (message.command === 'json') {
        if (isValidJson(message.jsonData)) {
          setStringifiedJson(message.jsonData);
        } else {
          const { postMessage } = SingletonAcquireVsCodeService.getInstance();
          const NOT_VALID_JSON = [message.fileName, 'is not a valid JSON.'];

          setStringifiedJson(JSON.stringify(NOT_VALID_JSON));
          postMessage({
            command: 'invalid-json',
            warningMessage: NOT_VALID_JSON.join(' '),
          } as WebviewMessage);
        }
      }

      if (message.command === 'init-settings') {
        initSettings(message.settings);
      }
    });
  }, []);
}
