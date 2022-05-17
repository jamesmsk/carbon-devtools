import { gridVersions } from './options';

const defaults = {};

defaults.global = {
  gridoverlay: true,
};

defaults.popup = {
  carbonStatus: 'loading',
  panelState: {
    open: false,
    children: null,
  },
};

defaults.grid = {
  toggle2xGrid: true,
};

defaults.toggle2x = {
  layout: 'sarge',
};

defaults.miniUnit = {
  miniUnitVerticalBorders: true,
  miniUnitHorizontalBorders: true,
};

defaults.specs = {
  type: 'typography',
  outline: true,
};

defaults.gridVersion = Object.keys(gridVersions)[0];

defaults.generalSettings = {
  nonCarbon: true,
  theme: 'g90',
  experimental: false,
};

defaults.ga = {
  isIBMer: 'unknown',
  clientId: 5555,
  gridVersion: defaults.gridVersion,
  generalTheme: defaults.generalSettings.theme,
  generalExperimental: defaults.generalSettings.experimental,
  generalNonCarbon: defaults.generalSettings.nonCarbon,
};

export { defaults };
