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
import {fetchMentorsMarketPlace, fetchMentorsMarketPlaceSearch, setAreas} from "../../actions/marketplace";
import { set } from 'lodash';


const FiltroAreas = (props) => {
    const {setSpin} = props
    const [isMobile, setIsMobile] = useState(false);
    const [seleccion, setSeleccion] = useState(false);

    const onChange = async (e) => {
        setSpin(true)
        setSeleccion(true)
        const type='skill'
        if (e.length > 0){
            await props.setAreas(e)
            await props.fetchMentorsMarketPlaceSearch(e, type, props.sort, props.rating, props.price)
        } else if(e.length === 0 && props.sort && props.sort.length > 0){
            await props.setAreas([])
            await props.fetchMentorsMarketPlaceSearch(e, type, props.sort, props.rating, props.price)
        } else if (e.length === 0 && props.sort && props.sort.length === 0){
            await props.setAreas([])
            await props.fetchMentorsMarketPlace()
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
        props.setAreas([])

    }, [isMobile])


    return (
        <Row id='filtro-areas' gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col lg={24} xs={24} md={24}>
                    <Row style={{height: 'auto'}}>
                        <Col className='checkboxes' lg={24} xs={24} md={24}>
                            <h5>Áreas de experticia</h5>
                        </Col>
                    </Row>
                    <Checkbox.Group style={{ width: '100%', marginLeft: '2%' }} onChange={onChange}>
                        {
                            Array.isArray(props.tags) ? (
                                props.tags.map(tag =>
                                    <Row>
                                        <Col className='checkboxes' lg={20} xs={20} md={20}>
                                            <Checkbox onChange={onChange} value={tag.id} checked={seleccion} className={seleccion ? 'seleccion' : ''}>{tag.name}</Checkbox>
                                        </Col>
                                        <Col className='checkboxes' lg={4} xs={4} md={4}>
                                        </Col>
                                    </Row>
                                )
                            ):
                                <span></span>
                        }
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

FiltroAreas.defaultProps = {
    skills: [],
    sort: [],

};

export default connect(mapStateToProps, {
    fetchMentorsMarketPlaceSearch,
    fetchMentorsMarketPlace,
    setAreas
})(FiltroAreas)