import React, { useState, useEffect } from 'react';
import FormGroup from 'carbon-components-react/es/components/FormGroup';
import RadioButtonGroup from 'carbon-components-react/es/components/RadioButtonGroup';
import RadioButton from 'carbon-components-react/es/components/RadioButton';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { defaults } from '../../../globals/defaults';

function Grid2xOptions() {
  const [toggle2xGridOptions, setToggle2xGridOptions] = useState(
    defaults.toggle2x
  );

  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggle2xGridOptions';
    getStorage([dataKey], (dataReceived) => {
      // should this be passed in via props?
      if (dataReceived && dataReceived[dataKey]) {
        setToggle2xGridOptions(dataReceived[dataKey]);
      }

      setOnLoad(true);
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggle2xGridOptions });
    }
  });

  return !onLoad ? null : (
    <FormGroup>
      <RadioButtonGroup
        orientation="vertical"
        defaultSelected={toggle2xGridOptions['layout']}
        name="radio-button-group"
        onChange={(e) => {
          const changes = { ...toggle2xGridOptions };
          changes['layout'] = e;
          setToggle2xGridOptions(changes);
        }}
      >
        <RadioButton
          defaultChecked
          labelText="Sarge"
          id="sarge"
          value="sarge"
        />
        <RadioButton labelText="Potato" id="potato" value="potato" />
        <RadioButton labelText="Bookworm" id="bookworm" value="bookworm" />
        <RadioButton labelText="Bullseye" id="bullseye" value="bullseye" />
        <RadioButton labelText="Buster" id="buster" value="buster" />
        <RadioButton labelText="Slink" id="slink" value="slink" />
      </RadioButtonGroup>
    </FormGroup>
  );
}

Grid2xOptions.propTypes = {};

export { Grid2xOptions };
