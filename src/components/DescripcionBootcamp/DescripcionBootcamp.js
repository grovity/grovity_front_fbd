import React from 'react';
import {Row, Col} from 'antd';
import './DescripcionBootcamp.scss'

class DescripcionBootcamp extends React.PureComponent {

    render() {
        const {descripcion1} = this.props;
        return (
            <Row className='descripcion-bootcamp' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col md={15} xs={20}>
                    <p>
                        {descripcion1}
                    </p>
                </Col>
            </Row>
        );
    }
}

export default DescripcionBootcamp;
