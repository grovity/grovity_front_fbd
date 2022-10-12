import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form,} from 'antd';
import {getId} from "../../selectors/institutions";
import {connect} from "react-redux";
import 'moment/locale/es';


const TableHerramientas = (props) => {
    const {eventos, status} = props
    const [data, setData] = useState(eventos);


    useEffect(() => {
       let eventos_array = []
        if (Array.isArray(eventos)) {
            for (let i = 0; i < eventos?.length; i++) {

                    eventos_array.push({
                        key: eventos[i].slug,
                        nombre: `${eventos[i].nombre}`,
                        fecha_inicio: eventos[i].fecha_inicio,
                        fecha_fin: eventos[i].fecha_fin,
                    })

            }
        }
        setData(()=> eventos_array)
    }, [])



    const columns = [
        {
            title: 'Nombre de la sesión',
            dataIndex: 'nombre',
            key: 'nombre',
            editable: false,
        },
        {
            title: 'Fecha Inicio',
            dataIndex: 'fecha_inicio',
            key: 'fecha_inicio',
        },
        {
            title: 'Fecha Fin',
            dataIndex: 'fecha_fin',
            key: 'fecha_fin',
        },

    ];


    return (
            <Table
                components={{
                    body: {},
                }}
                bordered
                dataSource={data}
                columns={columns}
                rowClassName="editable-row"
                pagination={{}}
            />
    );
};

const mapStateToProps = (state, props) => ({
    id: getId(state),
    eventos: state.events,
});

export default connect(mapStateToProps, {
})(TableHerramientas)