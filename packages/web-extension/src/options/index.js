import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import settings from 'carbon-components/es/globals/js/settings';
import { Footer, General } from './components';
import { storageChanged } from '@carbon/devtools-utilities/src/storageChanged';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { gaPageview } from '@carbon/devtools-utilities/src/ga';

import './index.scss';

const { prefix } = settings;

gaPageview('/options', document.title);

function Options() {
  const [data, setData] = useState({});

  const refreshData = () => {
    getStorage(null, (d) => {
      delete d.clientId;
      d.settingKeys = Object.keys(d);
      setData(d);
    });
  };

  useEffect(() => {
    refreshData(); // onload

    storageChanged(() => {
      refreshData(); // if data changes
    });
  }, []);

  return (
    <article className={`${prefix}--options ${prefix}--grid`}>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col`}>
          <h1 className={`${prefix}--options__title`}>Settings</h1>
          <General {...data} />
        </div>
      </div>
      <Footer />
    </article>
  );
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Options />, document.getElementById('app'));
