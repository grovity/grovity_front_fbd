import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import "./style.css"

const Alert = ({alerts}) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div className="alert_div">
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(Alert);