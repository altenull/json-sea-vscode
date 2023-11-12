/**
 * In the web version of JSON SEA, it was a local-storage service.
 * But VS Code extension doesn't have local storage, it changed to pass data to `extension.ts`.
 */
import { WebviewMessage } from '../../ext-src/extension';

export type StorageKey = 'settings:minimap' | 'settings:nodePath';

export type StorageKeyToValueTypeMap<K extends StorageKey> = {
  'settings:minimap': boolean;
  'settings:nodePath': boolean;
}[K];

export const storageService = {
  setItem: <K extends StorageKey>(key: K, value: StorageKeyToValueTypeMap<K>) => {
    const { postMessage } = SingletonAcquireVsCodeService.getInstance();

    postMessage({
      command: 'update-setting',
      setting: {
        settingOption: key,
        value,
      },
    } as WebviewMessage);
  },
};

class SingletonAcquireVsCodeService {
  private static instance = acquireVsCodeApi();

  public static getInstance(): ReturnType<typeof acquireVsCodeApi> {
    return SingletonAcquireVsCodeService.instance;
  }
}
