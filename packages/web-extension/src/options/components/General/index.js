import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Toggle from 'carbon-components-react/es/components/Toggle';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { configuration } from '../';

const { prefix } = settings;

function General({ generalNonCarbon }) {
  return (
    <div className={`${prefix}--row`}>
      <div className={`${prefix}--col-sm-2`}>
        <Toggle
          size="sm"
          labelText="Non-carbon pages"
          className={`${prefix}--options__non-carbon`}
          id="nonCarbon"
          toggled={generalNonCarbon}
          onChange={(e) => {
            configuration('general-ignore-validation', {
              generalNonCarbon: e.target.checked,
            });
            setStorage({ generalNonCarbonClear: false });
          }}
        />
      </div>
    </div>
  );
}

General.propTypes = {
  generalExperimental: PropTypes.bool,
  generalNonCarbon: PropTypes.bool,
  generalTheme: PropTypes.string,
};

export { General };
