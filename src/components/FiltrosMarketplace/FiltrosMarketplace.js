import React, {useState, useEffect} from 'react'
import {Col, Row, Divider} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import FiltroAreas from '../../components/FiltroAreas/FiltroAreas';
import FiltroValoracion from '../FiltroValoracion/FiltroValoracion';
import FiltroPrecio from '../FiltroPrecio/FiltroPrecio';
// import FiltroDuracion from '../FiltroDuracion/FiltroDuracion';


const FiltrosMarketplace = (props) => {

    const {setSpin} = props

    const [isMobile, setIsMobile] = useState(false);

    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    //   }

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
    }, [isMobile])


    return (
        <Row id='filtros-marketplace' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                    <FiltroAreas setSpin={setSpin} tags={props.tags}/>
                    <Divider/>
                    <FiltroValoracion setSpin={setSpin} />
                    <Divider/>  
                    <FiltroPrecio setSpin={setSpin} />
                    <Divider/>

            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
   user: selectCurrentUser(state)
});

export default connect(mapStateToProps, null)(FiltrosMarketplace)