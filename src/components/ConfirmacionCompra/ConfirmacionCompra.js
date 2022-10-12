import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Row, Col, Typography } from 'antd';
import './scss/component-sm.scss';
import './scss/component-md.scss';
import './scss/component-lg.scss';

const { Text } = Typography;

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Mentoria ${i}`,
    nombre_mentor: `Edrward ${i}`,
    num_horas: 32,
    val_hora: 2,
    val_total: (originData.num_horas * originData.val_hora),
  });
}

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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
              required: true,
              message: `¡${title} no puede estar vacio!`,
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

const ConfirmacionCompra = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);

//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, ...row });
//         setData(newData);
//       } else {
//         newData.push(row);
//         setData(newData);
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

  const handleDelete = key => {
    setData(data.filter(item => item.key !== key))
  };  

  const columns = [
    {
      title: 'Servicio',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Mentor',
      dataIndex: 'nombre_mentor',
      width: '20%',
    },
    {
      title: 'Numero de horas',
      dataIndex: 'num_horas',
      editable: true,
    },
    {
      title: 'Valor Hora',
      dataIndex: 'val_hora',
    },
    {
      title: 'Valor Total',
      dataIndex: 'val_total',
    },
    {
      title: 'Eliminar',
      dataIndex: 'operation',
      width: '5%',
      render: (text, record) =>
          data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            </Popconfirm>
          ) : null,
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
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <Form  form={form} component={false}>
      <Row id='tabla-indicadores'>
        <Col>
         
        </Col>
      </Row>
       
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        pagination={false}
        rowClassName="editable-row"
        summary={pageData => {
            let totalTotal = 0;

            pageData.forEach(({ val_total }) => {
            totalTotal += val_total;
             });
            return (
                <>
                <Table.Summary.Row>
                    <Table.Summary.Cell><strong>Total</strong></Table.Summary.Cell>
                    <Table.Summary.Cell/>
                    <Table.Summary.Cell/>
                    <Table.Summary.Cell/>
                    <Table.Summary.Cell>
                    <Text><strong>${totalTotal}</strong></Text>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
                </>
                );
            }}
        />
    </Form>
  );
};

export default ConfirmacionCompra;