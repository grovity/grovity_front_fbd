import React, {useState} from 'react'
import {Table, Tag, Form} from 'antd';


const columns = [
    {
        title: 'Día de la semana',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        render: text => <a>{text}</a>,
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
];

    const data = [
        {
            key: '1',
            name: 'Lunes',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Martes',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Miercoles',
            tags: ['cool', 'teacher'],
        },
        {
            key: '4',
            name: 'Jueves',
            tags: ['cool', 'teacher'],
        },
        {
            key: '5',
            name: 'Viernes',
            tags: ['cool', 'teacher'],
        },
        {
            key: '6',
            name: 'Sábado',
            tags: ['cool', 'teacher'],
        },
        {
            key: '7',
            name: 'Domingo',
            tags: ['cool', 'teacher'],
        },
    ];

const dias = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
]

const EditarDisponibilidad = (props) => {
    let data1 = []
    const {disponibilidad} = props
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

    const [form] = Form.useForm();
    const [data, setData] = useState(data1);
    const [editingKey, setEditingKey] = useState('');

        const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    return (
        <Table columns={columns} dataSource={data1}/>
    )
}

export default EditarDisponibilidad