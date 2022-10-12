import React, {useState, useEffect} from 'react'
import {Col, Row, Checkbox, Tag} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {GrFormPrevious} from "react-icons/gr";
import {fetchMentorsMarketPlaceSearch, setPrice} from "../../actions/marketplace";


const FiltroPrecio = (props) => {
    const {setSpin} = props
    const [isMobile, setIsMobile] = useState(false);
    const [seleccion, setSeleccion] = useState(false);

    const onChange = async (e) => {
        setSpin(true)
        await props.setPrice([])
        setSeleccion(true)
        if (e.target && e.target.value && e.target.checked) {
            await props.setPrice([e.target.value])
            await props.fetchMentorsMarketPlaceSearch(props.skills, 'rating', props.sort, props.rating, e.target.value)
        } else if (e.target && !e.target.checked){
            await props.setPrice([])
        }
        setSpin(false)

    }

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
        props.setPrice([])
    }, [isMobile])


    return (
        <Row id='filtro-areas' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row style={{height: 'auto'}}>
                    <Col className='checkboxes' lg={24} xs={24} md={24}>
                        <h5>Precio/Hora</h5>
                    </Col>
                </Row>
                <Checkbox.Group style={{width: '100%', marginLeft: '2%'}} onChange={onChange}>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''} value='0'>Gratis</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''} value="80"><GrFormPrevious/>$80mil</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''} value="200">$80mil - $200mil</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''} value="201">$200mil +</Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state),
    skills: state.areas,
    sort: state.sort,
    rating: state.rating,
    price: state.price,
});

FiltroPrecio.defaultProps = {
    price: [],

};
export default connect(mapStateToProps, {
    setPrice,
    fetchMentorsMarketPlaceSearch
})(FiltroPrecio)