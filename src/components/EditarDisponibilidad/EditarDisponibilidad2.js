import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Tag, Button, Row} from 'antd';
import {editDispoMentor, getDispoMentorDay} from "../../api/marketplace";
import {getId} from "../../selectors/institutions";
import {connect} from "react-redux";
import {fetchDisponibilidadMentor} from "../../actions/marketplace";
import {load} from "@amcharts/amcharts4/.internal/core/utils/Net";


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
const dias = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
]
const EditarDisponibilidad2 = (props) => {
    const {disponibilidad, id, setVisible, dateStr, setdispoMentor} = props
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();


    useEffect(()=>{
        let data1 =[]
        for (let i = 0; i < disponibilidad.length; i++) {
        let tags = []
        for (let j = 0; j < disponibilidad[i].string_availability.length; j++) {
            tags.push(disponibilidad[i].string_availability[j].start_hour + ' ' + disponibilidad[i].string_availability[j].end_hour)
        }
        data1.push({
            key: disponibilidad[i].day,
            name: dias[i],
            tags: tags
        })
    }
        setData(data1)
    },[disponibilidad])

    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {
        window.addEventListener('beforeunload', props.fetchDisponibilidadMentor(id))
    }, [])

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            tags: [],
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            let row = await form.validateFields();
            if (row.tags.split) {
                row['tags'] = row.tags.split(/,\s*/)
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
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Día de la semana',
            dataIndex: 'name',
            key: 'name',
            editable: false,
        },
        {
            title: 'Horas disponibles',
            key: 'tags',
            dataIndex: 'tags',
            editable: true,
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
              Guardar
            </a>
            <Popconfirm title="¿Esta seguro?" cancelText={'Cancelar'} onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Editar
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onFinish = async (data, id) => {
        setLoading(true)
        const editdispo = await editDispoMentor(data, id)
        if (editdispo && !editdispo.detail && !editdispo.error) {
            await props.fetchDisponibilidadMentor(id)
             let dispo = await getDispoMentorDay(dateStr, id)
            if(dispo){
                setdispoMentor(dispo)
            }

            setVisible(false)
        }
        setLoading(false)

    };

    return (
        <Form form={form}
              component={false}
              onFinish={onFinish}
        >
            <Row>
                <p>Formato 24 horas - separa por comas entre una franja y otra</p>
            </Row>
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
            <Button loading={loading} type="primary" className='btn-verde-basico' block htmlType="submit"
                    onClick={() => onFinish(data, props.id)}>
                Editar
            </Button>
        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    disponibilidad: state.disponibilidad_mentor,
    id: getId(state),
});

export default connect(mapStateToProps, {
    fetchDisponibilidadMentor,
})(EditarDisponibilidad2)