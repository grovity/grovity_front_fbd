import React from "react";
import {
    Form,
    DatePicker,
    InputNumber, Row, Col,
} from 'antd';
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {addValueIndicator, getIndicadoresValues, getIndicator} from "../../api/indicadores";
import {selectIdEmpresa} from "../../selectors/users";



const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


function IndicadorAddValueForm(props) {
    const {setloading, setVisible, indicator, setData1, setDataIndicador} = props

    const onFinish = async (values) => {
        setloading(true)
        const response = await props.addValueIndicator(values, indicator)
        if (response) {
            const response = await getIndicadoresValues(indicator)
            const response2 = await getIndicator( indicator)
            if (response) {
                setData1(response)
            }
            if(response2){
                setDataIndicador(response2)
            }
            setVisible(false)
        }
        setloading(false)
    };

    return (
        <Row>
            <Col>
                <Form {...layout}
                      id={`agregar-valor-indicador-${indicator}`}
                      name={`agregar-valor-indicador-${indicator}`}
                      onFinish={onFinish}

                >
                    <Row>
                        <Col>
                            <Form.Item
                                name='value'
                                label="Valor"
                                rules={[
                                    {
                                        type: 'number',
                                        message: 'Debe ingresar un número válido'
                                    },
                                    {
                                        required: true,
                                        message: 'Por favor agregar un valor para este indicador'
                                    }
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item
                                name='date_created_at'
                                label="DatePicker"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese una fecha'
                                    }
                                ]}
                            >
                                <DatePicker/>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Col>


        </Row>
    )
}

const mapStateToProps = (state) => ({
    id_empresa: selectIdEmpresa(state)

});

export default connect(mapStateToProps, {
    addValueIndicator,

})(IndicadorAddValueForm)