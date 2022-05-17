import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { defaults } from '../../../globals/defaults';
import { Grid2xOptions } from './Grid2xOptions';

const { prefix } = settings;

function Grid({ disabled }) {
  const [toggleGrids, setToggleGrids] = useState(defaults.grid);

  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggleGrids';
    getStorage([dataKey], (dataReceived) => {
      if (dataReceived && dataReceived[dataKey]) {
        setToggleGrids(dataReceived[dataKey]);
      }
      setOnLoad(true);
    });

    // gets and sets the grid version title
    getStorage(['gridVersion'], () => {});
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggleGrids });
    }
  });

  return !onLoad ? null : (
    <section className={`${prefix}--popup-main__section`}>
      <Grid2xOptions disabled={disabled || !toggleGrids['toggle2xGrid']} />
    </section>
  );
}

Grid.propTypes = {
  disabled: PropTypes.bool,
};

export { Grid };
