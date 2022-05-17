import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';

function manage2xGrid() {
  getStorage('toggle2xGridOptions', ({ toggle2xGridOptions }) =>
    manage2xGridOptions(toggle2xGridOptions)
  ); // set based on defaults
  storageItemChanged('toggle2xGridOptions', manage2xGridOptions); // update ui if options change
}

function manage2xGridOptions({ layout }) {
  const html = document.querySelector('html');
  const outerContainer = html.querySelector(`.msk-devtool-grid-container`);
  const innerContainer = outerContainer.querySelector(
    `.msk-devtool-inner-container`
  );

  const mainContainer = innerContainer.querySelector(
    '.msk-devtool-grid-overlay-content'
  );

  const asideContainer = innerContainer.querySelector('.msk-devtool-aside');

  const innerMostContainer = mainContainer.querySelector(
    '.msk-devtool-grid-overlay-columns'
  );

  const touchCol = (num) => {
    return innerMostContainer.querySelector(
      `.msk-devtool-grid-overlay-col:${num}`
    );
  };

  let numOfColumns;
  const columns = [];

  switch (layout) {
    case 'bullseye':
      numOfColumns = 9;
      break;
    default:
      numOfColumns = 12;
      break;
  }

  for (let i = 0; i < numOfColumns; i++) {
    columns.push(`<div class="msk-devtool-grid-overlay-col"></div>`);
  }

  innerMostContainer.innerHTML = columns.join('');

  function resetCol() {
    innerContainer.classList.remove('msk-layout-bullseye-container');
    mainContainer.classList.remove('msk-layout-bullseye-devtool-slot-main');
    asideContainer.classList.add('msk-devtool-hide');
    for (let i = 1; i <= 12; i++) {
      touchCol(`nth-child(${i})`).classList.remove('unused-col');
      touchCol(`nth-child(${i})`).classList.remove('aside-col');
    }
  }

  function fullWidth() {
    innerContainer.classList.remove('msk-devtool-compact');
    innerContainer.classList.add('msk-devtool-full');
  }

  function compactWidth() {
    innerContainer.classList.remove('msk-devtool-full');
    innerContainer.classList.add('msk-devtool-compact');
  }

  function bullseyeDisplay() {
    asideContainer.classList.remove('msk-devtool-hide');
    innerContainer.classList.remove('msk-devtool-full');
    innerContainer.classList.remove('msk-devtool-compact');
    innerContainer.classList.add('msk-layout-bullseye-container');
    mainContainer.classList.add('msk-layout-bullseye-devtool-slot-main');

    for (let i = 1; i <= 12; i++) {
      touchCol(`nth-child(${i})`).classList.remove('unused-col');
      touchCol(`nth-child(${i})`).classList.remove('aside-col');
    }
  }

  const allLayouts = [
    'bookworm',
    'sarge',
    'potato',
    'bullseye',
    'slink',
    'buster',
  ];

  allLayouts.forEach((item) => {
    if (layout === item) {
      mainContainer.classList.add(`msk-devtool-${item}`);
    } else {
      mainContainer.classList.remove(`msk-devtool-${item}`);
    }
  });

  switch (layout) {
    case 'sarge':
    case 'potato':
    case 'buster':
      resetCol();
      compactWidth();
      break;
    case 'bookworm':
    case 'slink':
      resetCol();
      fullWidth();
      break;
    case 'bullseye':
      bullseyeDisplay();
      break;
    default:
      resetCol();
      compactWidth();
      break;
  }
}

export { manage2xGrid };
