import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Tag, Button} from 'antd';
import {editDispoMentor, getDispoMentorDay} from "../../api/marketplace";
import {getId} from "../../selectors/institutions";
import {connect} from "react-redux";
import {fetchDisponibilidadMentor} from "../../actions/marketplace";
import DatePicker from "antd/es/date-picker";
import moment from "moment";
import 'moment/locale/es';
import {EnviarDatoDesdeMentor} from "../../api";


const dateFormat = 'YYYY-MM-DD';

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <DatePicker style={{width: '50%'}}/>;
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

const TablaIndicadores = (props) => {
    const {indicadores, status} = props

    let indicadores_array = []
    if (indicadores) {
        for (let i = 0; i < indicadores.length; i++) {
            indicadores_array.push({
                key: indicadores.id,
                nombre: indicadores.name,
                dato: '',
                fecha: moment().format('YYYY-MM-DD')
            })

        }
    }
    const [form] = Form.useForm();
    const [data, setData] = useState(indicadores_array);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {

    }, [])

    const edit = (record) => {
        let dateString = record.fecha;
        let momentObj = moment(dateString, 'YYYY-MM-DD');
        form.setFieldsValue({
            nombre: '',
            dato: '',
            ...record, fecha: momentObj
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            let row = await form.validateFields();
            if (row.fecha) {
                row['fecha'] = row.fecha.format('YYYY-MM-DD')
            }
            await EnviarDatoDesdeMentor(key, row)
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setData(newData);
                // console.log(data)
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
            dataIndex: 'nombre',
            key: 'nombre',
            editable: false,
        },
        {
            title: 'Dato',
            dataIndex: 'dato',
            key: 'dato',
            editable: true,
        },
        {
            title: 'Fecha del dato',
            dataIndex: 'fecha',
            key: 'fecha',
            editable: true,
        },

        {
            title: 'Operación',
            dataIndex: 'operation',
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
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Enviar dato
                    </a>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'dato' ? 'number' : 'datetime',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = (data, id) => {
        const editdispo = editDispoMentor(data, id)
        if (editdispo && !editdispo.detail && !editdispo.error) {
            let reload = () => {
                window.location.reload()
            }
            setTimeout(reload, 3000)
        }

    };

    return (
        <Form form={form}
              component={false}
              onFinish={onFinish}
        >
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
            {/*<Button type="primary" block htmlType="submit" onClick={() => onFinish(data, props.id)}>*/}
            {/*    Editar*/}
            {/*</Button>*/}
        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    disponibilidad: state.disponibilidad_mentor,
    id: getId(state),
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor
})(TablaIndicadores)