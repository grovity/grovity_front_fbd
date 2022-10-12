import React, {useState} from 'react'
import {Form, Input, InputNumber, Button, Divider, Select, Row, Col, Checkbox} from 'antd';
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {createIndicator} from "../../api/empresa";
import {
    selectIdEmpresa, selectIdEmpresa_desdeOtroPerfil, selectIdEmpresaEquipo
} from "../../selectors/users";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchEmpresaEmprendedor, fetchIndicadoresEmpresa} from "../../actions/fetchUsers";


const {Option} = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const items_basic = ['Numerico', 'Porcentaje', 'Unidades', 'Pesos Colombianos', 'USD', 'EURO']

function AddIndicador(props) {
    const {id_empresa, setloading, setVisible, id_empresa_desdeOtroPerfil, id_empresa_equipo} = props

    const [name, setName] = useState('')
    const [items, setItems] = useState(items_basic)
    const [trend, setTrend] = useState(true)
    let index = 0;


    const onFinish = async (values) => {
        setloading(true)
        let response=null
        if(id_empresa_equipo){
             response = await props.createIndicator(values, trend, id_empresa_equipo)
        } else {
             response = await props.createIndicator(values, trend, id_empresa ? id_empresa : id_empresa_desdeOtroPerfil)
        }

        if (response) {
            if (id_empresa_equipo) {
                await props.fetchIndicadoresEmpresa(id_empresa_equipo)
                await props.fetchEmpresaEmprendedor(id_empresa_equipo)
            } else {
                await props.fetchIndicadoresEmpresa(id_empresa ? id_empresa : props.match.params.id)
                await props.fetchEmpresaEmprendedor(id_empresa ? id_empresa : props.match.params.id)
            }

            setVisible(false)
        }
        setloading(false)
    };

    function onNameChange(event) {
        setName(event.target.value)

    };

    function addItem() {
        setItems([...items, name || `New item ${index++}`])
        setName('')
    };

    function onChange(e) {
        setTrend(e.target.checked)
    }

    return (
        <Row id="form-crear-actividad" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form {...layout}
                      id='form-agregar-indicador'
                      name="nest-messages"
                      onFinish={onFinish}
                >
                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name='name'
                                label="Nombre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el nombre del indicador'
                                    },
                                ]}
                            >
                                <Input placeholder='Ingrese el nombre del indicador'/>
                            </Form.Item>
                            <Form.Item name='description' label="Descripción"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Por favor agregue una descripción'
                                           },
                                       ]}>
                                <Input.TextArea placeholder='Agregue una descripción'/>
                            </Form.Item>

                            <Form.Item name='measure' label='Medido como:'
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Por favor agregue medida'
                                           },
                                       ]}>
                                <Select
                                    style={{width: 240}}
                                    placeholder="medidas"
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{margin: '4px 0'}}/>
                                            <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                                                <Input style={{flex: 'auto'}} value={name} onChange={onNameChange}/>
                                                <a
                                                    style={{
                                                        flex: 'none',
                                                        padding: '8px',
                                                        display: 'block',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={addItem}
                                                >
                                                    <PlusOutlined/> Agrega medida
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {items.map(item => (
                                        <Option key={item}>{item}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item
                                name='base_line'
                                label="Línea Base"
                                rules={[
                                    {
                                        type: 'number',
                                        message: 'Debe ingresar un número válido'
                                    },
                                    {
                                        required: true,
                                        message: 'Por favor agregue línea base'
                                    }
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item
                                name='goal'
                                label="Meta"
                                rules={[
                                    {
                                        type: 'number',
                                        message: 'Debe ingresar un número válido'
                                    },
                                    {
                                        required: true,
                                        message: 'Por favor agregue meta'
                                    }
                                ]}
                            >
                                <InputNumber/>
                            </Form.Item>
                            <Row justify='end' align='middle' style={{marginBottom: '2%'}}>
                                <Col xl={16} lg={16} md={16} sm={16} xs={24}>
                                    <Checkbox defaultChecked={true} onChange={onChange}>
                                        Desmarque la casilla si la meta es tendencia a la baja
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Col>

                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Form.Item name='x_axis' label="Nombre eje x gráfica">
                                <Input placeholder='Ingrese el nombre del eje x'/>
                            </Form.Item>
                            <Form.Item name='y_axis' label="Nombre eje y gráfica">
                                <Input placeholder='Ingrese el nombre del eje y'/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};


const mapStateToProps = (state, props) => ({
    id_empresa: selectIdEmpresa(state),
    id_empresa_desdeOtroPerfil: selectIdEmpresa_desdeOtroPerfil(state),
    id_empresa_equipo: selectIdEmpresaEquipo(state),

});
export default withRouter(connect(mapStateToProps, {
    createIndicator,
    fetchIndicadoresEmpresa,
    fetchEmpresaEmprendedor
})(AddIndicador));
