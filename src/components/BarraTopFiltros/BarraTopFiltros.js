import React, {useState, useEffect} from 'react'
import {Col, Row, Button, Select} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {
    fetchMentorsMarketPlace,
    fetchMentorsMarketPlaceSearch,
    fetchMentorsMarketPlaceSort,
    setSort
} from "../../actions/marketplace";

const {Option} = Select;


const BarraTopFiltros = (props) => {

    const {mentores, setSpin} = props
    const [isMobile, setIsMobile] = useState(false);
    const [value1, setValue1] = useState('relevant');

    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

   async function getMentorsfull () {
        setSpin(true)
        await props.fetchMentorsMarketPlace()
        setSpin(false)
    }

    async function handleChange(value) {
        setValue1(value)
        setSpin(true)
        const type='sort'
        await  props.setSort(value)
        await props.fetchMentorsMarketPlaceSearch(props.skills, type, value, props.rating, props.price)
       setSpin(false)

    }

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });
        props.setSort([])
    }, [isMobile, mentores])


    return (
        <Row id='barra-top-filtros' style={{width: '100%'}}>
            <Col lg={24} xs={24} md={24} style={{paddingLeft: '0%', paddingRight: '0%'}}>
                {isMobile ?
                    <></>
                    :
                    <Row gutter={[8,8]} justify='space-between'>
                        <Col className="resultados" lg={8} xs={24} md={8} xl={9}>
                            <p>{mentores.count} Resultados</p>
                        </Col>
                        <Col className="order" lg={10} xs={24} md={10} xl={10}>
                            <p>Ordenar por:
                                <Select className='ml-2' style={{width: 120}}
                                                    onChange={handleChange} value={value1}>
                                <Option value="relevant">Relevancia</Option>
                                <Option value="rating">Rating</Option>
                                <Option value="price">Precio</Option>
                            </Select></p>
                        </Col>
                        <Col lg={6} xs={24} md={6} xl={5}>
                            <Button className='btn-azul-basico' block type='primary' onClick={getMentorsfull}>Limpiar filtros</Button>
                        </Col>
                    </Row>
                }
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

BarraTopFiltros.defaultProps = {
    skills: [],
    sort: [],

};

export default connect(mapStateToProps, {
    fetchMentorsMarketPlaceSort,
    fetchMentorsMarketPlace,
    setSort,
    fetchMentorsMarketPlaceSearch
})(BarraTopFiltros)