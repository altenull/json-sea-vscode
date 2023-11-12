import { create } from 'zustand';
import { InitSettingItem } from '../../../ext-src/extension';
import { storageService } from '../../services/storage.service';

type State = {
  isMinimapOn: boolean;
  isNodePathOn: boolean;
};

type Actions = {
  initSettings: (settings: InitSettingItem[]) => void;
  toggleMinimap: () => void;
  toggleNodePath: () => void;
  resetSettingsStore: () => void;
};

const initialState: State = {
  isMinimapOn: true,
  isNodePathOn: true,
};

export const useSettingsStore = create<State & Actions>((set, get) => ({
  ...initialState,
  initSettings: (settings: InitSettingItem[]) => {
    const newState = settings.reduce(
      (acc: State, { settingOption, value }) =>
        settingOption === 'settings:minimap'
          ? {
              ...acc,
              isMinimapOn: value,
            }
          : settingOption === 'settings:nodePath'
          ? {
              ...acc,
              isNodePathOn: value,
            }
          : acc,
      initialState,
    );

    set(() => newState);
  },
  toggleMinimap: () => {
    const prev = get().isMinimapOn;

    set(() => ({
      isMinimapOn: !prev,
    }));
    storageService.setItem('settings:minimap', !prev);
  },
  toggleNodePath: () => {
    const prev = get().isNodePathOn;

    set(() => ({
      isNodePathOn: !prev,
    }));
    storageService.setItem('settings:nodePath', !prev);
  },
  resetSettingsStore: () => set(initialState),
}));
