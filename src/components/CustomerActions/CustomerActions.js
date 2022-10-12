import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css'

const CustomersActions = ({children}) => {
    return (
        <Fragment>
            <div className='text-center mt-5'>{children}</div>
        </Fragment>
    );
};

CustomersActions.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomersActions;