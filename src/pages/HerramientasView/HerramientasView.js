import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Layout, Divider, Select, Input, Modal} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {enquireScreen} from 'enquire-js';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "../../actions/auth";
import {fetchMentorships} from "../../actions/fetchMentorships";
import CardHerramientasMap from '../../components/CardHeramientas/CardHerramientasMap';
import MentorshipNew from '../../components/MentorshipNew/MentorshipNew'

const {Header, Content} = Layout;


const HerramientasView = (props) => {
    const {entidad, mentorships, status, urlPath} = props
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [mentoresEntidad, setMentoresEntidad] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCLick = async (e) => {
       await props.fetchMentorships(e)
    };

    const onSearch = (value) => {
        
        let searchResults = [];
        let res = [];

        if (value) {
            value = value.split(' ');
            value.map((val) => {
                setSearch(true);
                let results = mentorships.filter(obj => Object.values(obj).some(v => v?v.toString().toLowerCase().includes(val.toLowerCase()): false));
                if (results)
                    searchResults.push(results)
            })
            searchResults.map(r => {
                res = res.concat(r);
            })

            let uniqueResults = Array.from(new Set(res.map(a => a.id)))
                .map(id => {
                    return res.find(a => a.id === id)
                }) 
            setMentoresEntidad(uniqueResults);
           
        }
        else {
            setSearch(false);
        }
    }

    //________________________________
    // abre modal nueva herramienta
    const handleAddNew = () => {
        setVisible(true);
    };
    //________________________________
    // cierra modal nueva herraienta
    const handleCancel = () => {
        setVisible(false);
    };
     //________________________________
    // procesa modal crear herramienta


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

            <Layout id='herramientas-view'>
                <Header>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col lg={14} md={12} xs={24} xl={16} xxl={18}>
                                    <h3>Herramientas</h3>
                                </Col>
                                <Col lg={7} md={8} xs={24} xl={5} xxl={4} className='btns-header'>
                                        <Button className='btn-verde-basico' block onClick={handleAddNew}>
                                            Nueva herramienta
                                        </Button>
                                </Col>
                                <Modal
                                    className="modales-plan"
                                    visible={visible}
                                    title="Crear herramienta"
                                    onCancel={handleCancel}
                                    width={750}
                                    footer={[]}
                                >
                                    <MentorshipNew setLoading={setLoading} loading={loading} setVisible={setVisible} onCancel={handleCancel}
                                               />
                                </Modal>
                                    {
                                        isMobile ?
                                            <Col lg={0} md={4} xs={0} xl={0} className='btns-header'>
                                                <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                                    Volver
                                                </Button>
                                            </Col>
                                            :
                                            <Col lg={3} md={4} xs={12} xl={3} xxl={2} className='btns-header'>
                                                <Button className='btn-verde-basico' block onClick={() => props.history.goBack()}>
                                                    Volver
                                                </Button>
                                            </Col>
                                    }
                        <Divider className='header-marketplace'/>
                    </Row>
                </Header>

                <Content style={{overflow: 'hidden'}}>
                    
                    <CardHerramientasMap mentorships={search? mentoresEntidad : mentorships} 
                                            entidad={entidad} status={status} urlPath={urlPath}/>
                </Content>
            </Layout>

    )
}

HerramientasView.propTypes = {

};

HerramientasView.defaultProps = {
     mentorships: []
};

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps, {
    fetchMentorships,
    loadUser,
})(HerramientasView));
