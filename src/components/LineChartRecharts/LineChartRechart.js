import React, {useEffect, useState} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer
} from 'recharts';
import {Button, Modal, Progress, Row, Col} from "antd";
import IndicadorAddValueForm from "../IndicatorsAddValueForm/IndicatorsAddValueForm";
import {connect} from "react-redux";
import {deleteValueIndicator, getIndicadoresValues, getIndicator} from "../../api/indicadores";
import IndicadorEditValueForm from "../IndicatorsAddValueForm/IndicatorsEditValueForm";
import PopConfirm from "../PopConfirm/PopConfirm";


const LineChartRechart = (props) => {
    const {indicador, width, height, title, eje_x, eje_y, color, entidad} = props
    const [data1, setData1] = useState(null)
    const [fullData, setFullData] = useState(null)
    const [dataIndicador, setDataIndicador] = useState(null)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [flag, setflag] = useState(false);
    const [id, setId] = useState(null);
    const [valor, setValor] = useState(null);
    const [fecha, setFecha] = useState(null);


    useEffect(() => {
        (async () => {
            const response = await getIndicadoresValues(indicador)
            const response2 = await getIndicator(indicador)
            if (response) {
                setData1(response)
            }
            if (response2) {
                setDataIndicador(response2)
            }
            setflag(false)

        })()

    }, [indicador])
    useEffect(() => {
        if (data1 && dataIndicador) {
            let array = [...data1]
            for (let i = 0; i < data1.length; i++) {
                array[i] = {...data1[i], linea_base: dataIndicador?.base_line, meta: dataIndicador?.goal}
            }
            setFullData(array)
        }

    }, [data1, dataIndicador])
    const handleModal = () => {
        setVisible(true);
    }

    function handleClick(f) {
        setValor(() => f.payload.value)
        setFecha(f.payload.date_created_at)
        setId(() => f.payload.id)
        setVisible2(true);


    }

    return (
        <Col>
            <Modal
                title="Agregar valor"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={[
                    <Button form={`agregar-valor-indicador-${indicador}`} key='submit'
                            htmlType="submit" loading={loading}
                            className='btn-verde-basico'>
                        Agregar
                    </Button>,
                ]}
            >
                <IndicadorAddValueForm indicator={indicador} setloading={setLoading}
                                       setVisible={setVisible}
                                       setFlag={setflag} setData1={setData1} setDataIndicador={setDataIndicador}/>

            </Modal>
            <Modal
                title="Editar valor"
                centered
                visible={visible2}
                onOk={() => setVisible2(false)}
                onCancel={() => setVisible2(false)}
                width={1000}
                footer={[
                    <Row justify='end' gutter={[8, 8]}>
                        <Col>
                            <Button form={`editar-valor-indicador-${id}`} key='submit'
                                    htmlType="submit" loading={loading2}
                                    className='btn-verde-basico'
                            >
                                Editar
                            </Button>
                        </Col>
                        <Col>
                            <PopConfirm message={'valor'} type={'primary'} functionDelete={props.deleteValueIndicator}
                                        id={id}></PopConfirm>
                        </Col>
                    </Row>
                    ,
                ]}
            >
                <IndicadorEditValueForm indicator={indicador} setloading={setLoading2}
                                        setVisible={setVisible2}
                                        setFlag={setflag} setData1={setData1} id={id} valor={valor} fecha={fecha}/>

            </Modal>

            <Row gutter={[12, 12]}>
                <Col xxl={10} xl={10} lg={10} md={24} sm={24} xs={24}>
                    <h4>{dataIndicador?.name}</h4>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                    <Progress percent={dataIndicador?.progress?.toFixed(0)} strokeColor='var(--primary-color)'/>
                </Col> {
                !entidad && (
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <Button className='btn-azul-basico' block onClick={handleModal}>Agregar dato</Button>
                    </Col>
                )
            }

            </Row>
            <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <ResponsiveContainer width='100%' height={400}>
                        <LineChart
                            width={width}
                            height={height}
                            data={fullData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                            title='índice de aprobación'
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date_created_at"/>
                            <YAxis>
                                <Label
                                    value={dataIndicador?.y_axis}
                                    position="insideLeft"
                                    angle={-90}

                                    style={{textAnchor: 'middle'}}
                                />
                            </YAxis>
                            <Tooltip/>
                            <Legend/>

                            <Line type="monotone" dataKey="linea_base" stroke={'#EF7684'} activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="meta" stroke={'#2AF091'} strokeWidth={2} activeDot={{r: 8}}/>
                            {
                                !entidad ?
                                    <Line activeDot={{
                                        onClick: (e, f) => {
                                            handleClick(f)
                                        }, r: 8
                                    }} type="monotone" dataKey="value" stroke={'#C970EE'} strokeWidth={2}/> :
                                    <Line type="monotone" dataKey="value" stroke={'#C970EE'} strokeWidth={2}/>
                            }

                        </LineChart>
                    </ResponsiveContainer>

                    <Row justify='center'>
                        <p style={{marginTop: '2%'}}>{dataIndicador?.x_axis}</p>
                    </Row>
                </Col>

            </Row>
            <Row justify='space-around' style={{marginTop: '3%'}}>
                <Col>
                    <p><strong>Línea base:</strong> {dataIndicador?.base_line} </p>
                </Col>
                <Col>
                    <p><strong>Meta:</strong> {dataIndicador?.goal}</p>
                </Col>
                <Col>
                    <p><strong>Medido en:</strong> {dataIndicador?.measure}</p>
                </Col>
                <Col>
                    <p><strong>Estado actual:</strong> {dataIndicador?.current_state}</p>
                </Col>
            </Row>
        </Col>
    );
}


const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps, {
    deleteValueIndicator
})(LineChartRechart)
