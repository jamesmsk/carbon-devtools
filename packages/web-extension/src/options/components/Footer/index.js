import settings from 'carbon-components/es/globals/js/settings';
import Link from 'carbon-components-react/es/components/Link';
import React from 'react';

import packageJSON from '../../../../package.json';

const { prefix } = settings;
const { bugs, repository } = packageJSON;

function Footer() {
  return (
    <footer className={`${prefix}--row`}>
      <ul className={`${prefix}--options__meta ${prefix}--col`}>
        <li>
          <Link
            href={repository.url}
            // href="https://github.mskcc.org/digital-transformers/design-system"
            target="_blank"
          >
            code repository
          </Link>
        </li>
        <li>
          <Link
            href={bugs.url}
            // href="https://github.mskcc.org/digital-transformers/design-system/issues"
            target="_blank"
          >
            submit an issue
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export { Footer };
