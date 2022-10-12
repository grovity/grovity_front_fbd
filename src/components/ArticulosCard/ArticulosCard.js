import React from 'react';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';
import {Card, Button} from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function ArticulosCard (props) {

    return (
        <div className='articulo-card'>
             <Card
                hoverable
                // cover={<img alt="example" src={Foto} />}
            >
                {/* <Meta title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, ut laoreet " 
                        description="Lorem ipsum dolor sit amet, consectetuer adipiscing volutpat. " /> */}
                <Meta title={props.article.name}/>
                <Button className="leer-mas" href={props.article.file} target='_blank' type='link'>
                    Leer más
                </Button>                           
            </Card>
        </div>
    );
}