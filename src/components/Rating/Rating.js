import React from 'react'
import mobiscroll from '@mobiscroll/react';

import '@mobiscroll/react/dist/css/mobiscroll.scss';

mobiscroll.settings = {
    theme: 'mobiscroll',
    themeVariant: 'light',
}


class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (

            <div>

                <mobiscroll.Rating values={[2]}></mobiscroll.Rating>

            </div>

        );
    }
}

export default Rating