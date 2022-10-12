import React, {useState, useEffect} from 'react'
import {Row, Col, Card} from 'antd';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import FotoPerfilMentor from '../../components/FotoPerfilMentor/FotoPerfilMentor';
import MarketplaceInfoMain from '../../components/MarketplaceInfoMain/MaketplaceInfoMain';
import MarketplaceInfoBasica from '../../components/MarketplaceInfoBasica/MarketplaceInfoBasica';
import {enquireScreen} from 'enquire-js';


const CardMarketplace = (props) => {
    const {mentor} = props

    const [isMobile, setIsMobile] = useState(false);

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
        <Card className='mb-3' id="card-marketplace">
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={6} md={7} xs={24} style={{textAlign: 'center'}}>
                    <FotoPerfilMentor
                        user={mentor}/>
                </Col>
                <Col lg={18} md={17} xs={24}>
                    <MarketplaceInfoMain
                        mentor={mentor}/>
                    <MarketplaceInfoBasica
                        mentor={mentor}/>
                </Col>
            </Row>
        </Card>
    )
}

export default CardMarketplace;