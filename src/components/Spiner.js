import spinner from '../../src/assets/images/spinner.gif';
import React, {Fragment} from 'react';

export default () => (
    <Fragment>
        <img
            style={{width: '200px', margin: 'auto', display: 'block'}}
            alt='Loading...'
            src={spinner}
        />
    </Fragment>
);