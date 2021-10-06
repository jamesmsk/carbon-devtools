import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Tag } from 'carbon-components-react';
import settings from 'carbon-components/es/globals/js/settings';
import {
  getMessage,
  sendMessage,
  getStorage,
  experimentalFlag,
  gaPageview,
  gaDomEvent,
  gaNavigationEvent,
  gaException,
  setIBMer,
} from '@carbon/devtools-utilities';
import { defaults } from '../globals/defaults';
import { Loading, Empty, Main, MoreOptions } from './components';

import './index.scss';

const { prefix } = settings;

let carbonStatus = defaults.popup.carbonStatus;

gaPageview('/popup', document.title);

function Popup() {
  const [onCarbon, setOnCarbon] = useState(carbonStatus); // eslint-disable-line no-unused-vars
  const [initialMsg, setInitialMsg] = useState();
  const [panelState, setPanelState] = useState(defaults.popup.panelState);

  let Content = Loading,
    panelControls = {
      open: (name, children) => {
        setPanelState({
          open: true,
          children: children,
        });
        gaNavigationEvent('panel', name, 1);
      },
      close: (name) => {
        setPanelState({
          open: false,
          children: panelState.children,
        });
        gaNavigationEvent('panel', name, 0);
      },
    };

  useEffect(() => {
    let startPerfCheck = performance.now();

    sendMessage({ popup: true });

    getStorage(['generalTheme'], ({ generalTheme }) => {
      document.body.setAttribute('class', `${prefix}--popup--${generalTheme}`);
    });

    getMessage((msg) => {
      const msgKeys = Object.keys(msg);

      if (
        msg.digitalData &&
        msg.digitalData.user &&
        msg.digitalData.user.segment
      ) {
        setIBMer(msg.digitalData.user.segment.isIBMer);
      } else {
        setIBMer(3); // unknown, but probably not
      }

      if (msgKeys.indexOf('runningCarbon') > -1) {
        carbonStatus = true;
        setOnCarbon(true);
        setInitialMsg(msg);
      } else if (
        carbonStatus !== true &&
        Boolean(msg.runningCarbon) === false
      ) {
        // undefined || false
        carbonStatus = false;
        setOnCarbon(false);
      }

      perfCheck(startPerfCheck, msg);
    });
  }, []);

  if (carbonStatus === true) {
    Content = Main;
  } else if (carbonStatus === false) {
    Content = Empty;
  }

  return (
    <article
      className={`${prefix}--popup ${experimentalFlag(
        () => `${prefix}--popup--experimental`
      )}`}
    >
      <header className={`${prefix}--popup__header`}>
        <div className={`${prefix}--col-sm-3`}>
          <h1 className={`${prefix}--popup__heading`}>
            Carbon Devtools
            {experimentalFlag(() => (
              <Tag
                type="magenta"
                className={`${prefix}--popup__experimental-tag`}
              >
                Exp
              </Tag>
            ))}
          </h1>
        </div>
        <div className={`${prefix}--col-sm-1`}>
          <MoreOptions />
        </div>
      </header>
      <section
        className={`${prefix}--popup__panel-container ${activePanel(
          panelState
        )}`}
      >
        <main className={`${prefix}--grid ${prefix}--popup__panel`}>
          <Content initialMsg={initialMsg} _panelControls={panelControls} />
        </main>
        <aside className={`${prefix}--popup__panel`}>
          {panelState.children}
        </aside>
      </section>
    </article>
  );
}

function activePanel(stateName) {
  if (stateName.open) {
    return `${prefix}--popup__panel--shift`;
  }

  return '';
}

function perfCheck(startTime, msg) {
  const time = performance.now() - startTime;
  const timeToCheck = 1000;
  let status = 'non-carbon';

  if (!msg.carbonDevtoolsInjected) {
    if (msg.ignoreValidation) {
      status = 'ignored';
    } else {
      if (msg.runningCarbon) {
        status = 'carbon';
      }
    }

    gaDomEvent('validate', status, Math.round(time));

    if (time > timeToCheck) {
      gaException(`Slow validation: ${time}ms`, 0);
    }
  }
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));
