import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Checkbox, Spin} from 'antd';
import {getId} from "../../selectors/institutions";
import {connect} from "react-redux";
import 'moment/locale/es';
import {fetchEmpresaEmprendedor, fetchIndicadoresEmpresa} from "../../actions/fetchUsers";
import {deleteIndicador, editIndicator} from "../../api/empresa";
import {selectIdEmpresa, selectIdEmpresaEquipo} from "../../selectors/users";
import {withRouter} from "react-router-dom";


const componentType = (inputType, record, onChange) => {

    if (inputType === 'number') {
        return <InputNumber/>
    } else if (inputType === 'checkbox') {
        let check = false
        if (record.trend === "Positiva") {
            check = true
        }
        return <Checkbox defaultChecked={check} onChange={onChange}/>
    } else {
        return <Input/>
    }
}


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          onChange,
                          children,
                          ...restProps
                      }) => {
    const inputNode = componentType(inputType, record, onChange)
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: false,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const test = () => {
    return EditableCell
}

const TablaIndicadores_usuario = (props) => {
    const {id_empresa, status, indicadores, id_empresa_equipo} = props

    const [data, setData] = useState(indicadores ? [...indicadores] : []);
    const [editingKey, setEditingKey] = useState('');
    const [check, setCheck] = useState(false)

    const [form] = Form.useForm();

    const onChange = (e) => {
        setCheck(e.target.checked)
    }

    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {
        let new_indicadores = [...indicadores]
        for (let i = 0; i < indicadores?.length; i++) {
            indicadores[i]['key'] = indicadores[i].id
            if (indicadores[i]['trend']) {
                indicadores[i]['trend'] = 'Positiva'
            } else {
                indicadores[i]['trend'] = 'Negativa'
            }
        }
        setData((prev) => new_indicadores)

    }, [indicadores])

    const handleDelete = async (key) => {
        const dataSource = [...data];
        const dta = dataSource.filter(item => item.key !== key)
        setData(dta);
        let response = await props.deleteIndicador(key)
        if (response) {
            if (id_empresa_equipo) {
                await props.fetchIndicadoresEmpresa(id_empresa_equipo)
                await props.fetchEmpresaEmprendedor(id_empresa_equipo)
            } else {
                await props.fetchIndicadoresEmpresa(id_empresa ? id_empresa : props.match.params.id)
                await props.fetchEmpresaEmprendedor(id_empresa ? id_empresa : props.match.params.id)
            }

        }

    };


    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            base_line: '',
            goal: '',
            x_axis: '',
            y_axis: '',
            description: '',
            measure: '',
            ...record, trend: check
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            let row = await form.validateFields();
            const editdIndicator = await props.editIndicator(row, key, check)
            if (editdIndicator) {
                if (id_empresa_equipo) {
                    await props.fetchIndicadoresEmpresa(id_empresa_equipo)
                } else {
                    await props.fetchIndicadoresEmpresa(id_empresa ? id_empresa : props.match.params.id)
                }

            }
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {

        }
    };

    const columns = [
        {
            title: 'Indicador',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            fixed: 'left',
            width: 250,
        },
        {
            title: 'Tendencia',
            dataIndex: 'trend',
            key: 'trend',
            editable: true,
            fixed: 'left',
            width: 140,
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
            editable: true,
            width: 250,
        },
        {
            title: 'Linea Base',
            dataIndex: 'base_line',
            key: 'base_line',
            editable: true,
            width: 140,
        },
        {
            title: 'Meta',
            dataIndex: 'goal',
            key: 'goal',
            editable: true,
            width: 140,
        },
        {
            title: 'Medido en',
            dataIndex: 'measure',
            key: 'measure',
            editable: true,
        },
        {
            title: 'Nombre eje x',
            dataIndex: 'x_axis',
            key: 'x_axis',
            editable: true,
        },
        {
            title: 'Nombre eje y',
            dataIndex: 'y_axis',
            key: 'y_axis',
            editable: true,
        },

        {
            title: 'Acción',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Enviar
            </a>
            <Popconfirm title="¿Estás seguro?" cancelText={'Cancelar'} onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
                ) : (
                    <>
                        <a disabled={editingKey !== ''} onClick={() => edit(record)}
                           style={{marginRight: 10, color: '#95c11f'}}>
                            Editar
                        </a>
                        <Popconfirm title="¿Estás seguro?" cancelText={'Cancelar'}
                                    onConfirm={() => handleDelete(record.key)}>
                            <a style={{color: 'red'}}>Eliminar</a>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        const typesInputs = () => {
            if (col.dataIndex === ('base_line' || 'goal')) {
                return 'number'
            } else if (col.dataIndex === 'trend') {
                return 'checkbox'
            } else {
                return 'text'
            }

        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: typesInputs(),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                onChange: onChange
            }),
        };
    });


    return (
        <Form form={form}
              component={false}

        >
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                scroll={{x: 1500}}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />

        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    disponibilidad: state.disponibilidad_mentor,
    id: getId(state),
    id_empresa: selectIdEmpresa(state),
    id_empresa_equipo: selectIdEmpresaEquipo(state),

});

export default withRouter(connect(mapStateToProps, {
    fetchIndicadoresEmpresa,
    editIndicator,
    deleteIndicador,
    fetchEmpresaEmprendedor,
})(TablaIndicadores_usuario))