import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form,} from 'antd';
import {getId, getIdInstitution} from "../../selectors/institutions";
import {connect} from "react-redux";
import 'moment/locale/es';
import {deleteFuncionario} from "../../api/funcionario";
import {fetchEmprendedor, fetchFuncionarios} from "../../actions/fetchUsers";
import {deleteUsuario} from "../../api/mentorships";


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
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
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

const TableFuncionarios = (props) => {
    const {funcionarios, id_institution} = props
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {
        let funcionarios_array = []
        if (funcionarios) {
            for (let i = 0; i < funcionarios.length; i++) {
                funcionarios_array.push({
                    key: funcionarios[i].username,
                    nombre: `${funcionarios[i].first_name} ${funcionarios[i].last_name}`,
                    email: funcionarios[i].email,
                })
            }
        }
        setData(funcionarios_array)

    }, [funcionarios])

    const handleDelete = async (key) => {
        const dataSource = [...data];
        const dta = dataSource.filter(item => item.key !== key)
        setData(dta);
        let response = await deleteUsuario(key, 1)
        if (response) {
          await props.fetchFuncionarios(id_institution)

        }
    };


    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            let row = await form.validateFields();
            //____________________
            // insertar codigo aqui
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
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            editable: true,
        },
        {
            title: 'Acción',
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
              Guardar
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
                ) : (
                    <>
                        <Popconfirm title="¿Estás seguro?" cancelText={'Cancelar'} onConfirm={() => handleDelete(record.key)}>
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

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = (data, id) => {
        // console.log(data)
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
        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    id: getId(state),
    id_institution: getIdInstitution(state)
});

export default connect(mapStateToProps, {
fetchFuncionarios})(TableFuncionarios)