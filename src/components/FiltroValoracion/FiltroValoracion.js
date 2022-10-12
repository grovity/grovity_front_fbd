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
import {GoStar} from "react-icons/go";
import {fetchMentorsMarketPlaceSearch, setRating} from "../../actions/marketplace";


const FiltroValoracion = (props) => {

    const {setSpin} = props
    const [isMobile, setIsMobile] = useState(false);
    const [seleccion, setSeleccion] = useState(false);

    const onChange = async (e) => {

        setSpin(true)
        setSeleccion(true)
        if (e.target.value && e.target.checked) {
            await props.setRating([e.target.value])
            await props.fetchMentorsMarketPlaceSearch(props.skills, 'rating', props.sort, e.target.value, props.price)
        } else if(!e.target.checked) {
            await props.setRating([])
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
        props.setRating([])
    }, [isMobile])


    return (
        <Row id='filtro-areas' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                <Row style={{height: 'auto'}}>
                    <Col className='checkboxes' lg={24} xs={24} md={24}>
                        <h5>Calificación</h5>
                    </Col>
                </Row>
                {/* <Checkbox.Group style={{ width: '100%', marginLeft: '2%' }} onChange={onChange}> */}
                <Checkbox.Group style={{width: '100%', marginLeft: '2%'}}>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="5" onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''}>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/></Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="4" onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''}>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/></Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="3" onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''}>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/></Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="2" onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''}>
                                <GoStar className='icons'/>
                                <GoStar className='icons'/></Checkbox>
                        </Col>
                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                            <Checkbox value="1" onChange={onChange} checked={seleccion} className={seleccion ? 'seleccion' : ''}>
                                <GoStar className='icons'/></Checkbox>
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

FiltroValoracion.defaultProps = {
    rating: [],

};

export default connect(mapStateToProps, {
    setRating,
    fetchMentorsMarketPlaceSearch
})(FiltroValoracion)