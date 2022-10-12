import React  from "react";
import {
    Form,
    DatePicker,
    InputNumber, Row, Col, Button,
} from 'antd';
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {editValueIndicator, getIndicadoresValues} from "../../api/indicadores";
import {selectIdEmpresa} from "../../selectors/users";
import moment from "moment";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


function IndicadorEditValueForm(props) {
    const {setloading, setVisible, indicator, setData1, id, valor, fecha} = props

    const onFinish = async (values) => {
        setloading(true)
        const response = await props.editValueIndicator(values, id)
        if (response) {
            const response = await getIndicadoresValues(indicator)
            if (response) {
                setData1(response)
            }
            setVisible(false)
        }
        setloading(false)
    };

    const dateFormat = 'YYYY/MM/DD';

    return (
        <Row>
            <Col>
                <Form {...layout}
                      id={`editar-valor-indicador-${id}`}
                      name={`editar-valor-indicador-${id}`}
                      onFinish={onFinish}
                      initialValues={{
                          value:valor,
                          date_created_at: moment(fecha, dateFormat),

                      }}

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
    editValueIndicator,

})(IndicadorEditValueForm)