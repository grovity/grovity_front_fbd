import React, {useState, useEffect, useCallback} from 'react'
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
import {useDropzone} from 'react-dropzone'
import {Camera} from '../../helpers/icons'
import {
    selectCurrentUser,
} from "../../selectors/users";
import {connect} from "react-redux";
import {enquireScreen} from 'enquire-js';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Divider,
    Button, Checkbox
} from 'antd';
import {editInstitution, tipos_usuarios} from "../../api";
import {Spinner} from "react-bootstrap";
import TimeZoneSelect from '../../components/TimeZoneSelect';
import AllCountryWithTimeZone, {getTimeZone ,setTimeZone} from "../../helpers/countrys";
import { PlusOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';


// Emprendedor
let emprendedorType = ['ER', 'Emprendedor-es']
let consultorType = ['EO', 'Empresario-s'] 
let mentorType = ['ME', 'Mentee-s']

//mentor
let mienbroJuntaType = ['MJ', 'Miembro de junta-']
let consultorType2 = ['CR', 'Consultor-es']
let mentorType2 = ['MR', 'Mentor-es']


const { Option } = Select;
let index = 0;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


const EdicionPerfilEntidad = (props) => {


    const {institution, user, setVisible} = props

    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(institution.logo);
    const [avatarFile, setAvatarFile] = useState(null);
    const [tipos_usuarios, setTipoUsuarios] = useState([]);
    const [correos, setCorreos] = useState(institution.secure_emails)
    const [loading, setLoading] = useState(false)

    const [itemsEmprendedor, setItemsEmprendedor] = useState(['Emprendedor','Empresario','Mentee']);
    const [itemsMentor, setItemsMentor] = useState(['Miembro de junta','Consultor','Mentor']);
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');

    // let itemsBridge = []
    // if(tipos_usuarios && Array.isArray(tipos_usuarios.emprendedor)){
    //     tipos_usuarios.emprendedor.map((item) => {
    //       if(Array.isArray(item)){
    //         // setItems(items => [...items, item[1].replace('-', '')])
    //         itemsBridge.push(item[1].replace('-', ''))
    //       }
    //     })

    // }
    // setItems(items => [...items, ...itemsBridge])
    const onNameChange = (event) => {
        setName(event.target.value);
      };
      // const addItem = (e) => {
      //   e.preventDefault();
      //   setItems([...items, name || `New item ${index++}`]);
      //   setName('');
      // };
        
      const addItemParticipantes = (e) => {
        e.preventDefault();
        setItemsEmprendedor([...itemsEmprendedor, name || `New item ${index++}`]);
        setName('');
      }
      const addItemMentores = (e) => {
        e.preventDefault();
        setItemsMentor([...itemsMentor, name || `New item ${index++}`]);
        setName('');
      }
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    })
    const {getRootProps: getRootAvatarProps, getInputProps: getInputBannerProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar

    })


    enquireScreen((b) => {
        return () => {
            setIsMobile(b);
        }
    })

    useEffect(() => {
        enquireScreen((b) => {
            setIsMobile(
                !!b
            );
        });

        const getTiposUsuarios = async () => {
            const tiposUsuarios = await props.tipos_usuarios()
            console.log(tiposUsuarios)
            setTipoUsuarios(tiposUsuarios)
        }

        getTiposUsuarios()


    }, [isMobile])


    const onFinish = async values => {
        setLoading(true)
      
        const response = await props.editInstitution(values, user.id, avatarFile, correos)
        if(response) {
            setVisible(false)
        }
        setLoading(false)

    };
    function handleCorreos (e){
        setCorreos(e.target.checked)
    }


    return (
        <Form id='edicion-perfil-entidad'
              {...formItemLayout}
              form={form}
              name="edicion-perfil-entidad"
              onFinish={onFinish}
              initialValues={{
                  razon_social: institution.razon_social,
                  direccion: institution.direccion,
                  nit: institution.nit,
                  descripcion: institution.descripcion,
                  emprendedor_tipo: institution.emprendedor_tipo,
                  mentor_tipo: institution.mentor_tipo,
                  secure_emails: correos
              }}
              scrollToFirstError
              labelAlign="right"
        >
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col lg={24} md={20} sm={24} xs={24}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <h4>Información entidad</h4>
                            <div
                                className='avatar mb-5'
                                style={{backgroundImage: `url('${avatarUrl}')`}}
                                {...getRootAvatarProps()}>
                                <input {...getInputBannerProps()}/>
                                <Camera/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            <Form.Item name='razon_social' label="Nombre" rules={[{required: true, message: 'Por favor escriba el nombre de la entidad!'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='nit' label="Identificación tributaria" rules={[{required: true, message: 'Por favor la Identificación tributaria'}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            <Form.Item name='direccion' label="Dirección" rules={[{required: false}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={18} md={24} sm={24} xs={24}>
                        <Form.Item
                                    name="Zona Horaria"
                                    label=" Zona Horaria"
                                >
                  
                                <TimeZoneSelect/>
                                </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={18} md={24} sm={24} xs={24}>
                            <Form.Item name='descripcion' label="Acerca de la entidad">
                                <Input.TextArea/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider className='divider-sections'/>
                    <Row>
                        <h4>Opciones</h4>
                    </Row>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Row style={{marginBottom: 8, width: '100%'}}>
                                <Col lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        hasFeedback
                                        label="¿Cómo quiere llamar a los participantes?"
                                        name={'emprendedor_tipo'}
                                        rules={[{
                                            required: false,
                                            message: 'Por favor seleccione el área!'
                                        }]}
                                    >
<Select
      style={{
        width: 300,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            align="center"
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
            <Typography.Link
              onClick={addItemParticipantes}
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              <PlusOutlined /> Add item
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {itemsEmprendedor.map((item) => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={24} md={24} sm={24} xs={24}>
                                    <Form.Item
                                        hasFeedback
                                        label="¿Cómo quiere llamar a los mentores?"
                                        name={'mentor_tipo'}
                                        rules={[{
                                            required: false,
                                            message: 'Por favor seleccione el área!'
                                        }]}
                                    >
<Select
      style={{
        width: 300,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            align="center"
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
            <Typography.Link
              onClick={addItemMentores}
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              <PlusOutlined /> Add item
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {itemsMentor.map((item) => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        
                                <Form.Item {...tailLayout}
                                name='secure_emails'>
                                    <Checkbox checked={correos} onChange={handleCorreos}>Seleccione para no mostrar correos de sus usuarios</Checkbox>
                                </Form.Item>
                            

                              <Row justify='end'>
                                <Col lg={2} md={2} sm={2} xs={2}>
                                    <Button key='submit' htmlType="submit"
                                            form='edicion-perfil-entidad' className='btn-verde-basico'>
                                        {!loading ? "Editar" : <Spinner animation="border" size={'sm'}/>}

                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state, props) => ({
    user: selectCurrentUser(state)
});

export default connect(mapStateToProps, {
    tipos_usuarios,
    editInstitution,

})(EdicionPerfilEntidad)