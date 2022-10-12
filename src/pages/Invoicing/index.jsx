import React, { Component, Fragment, useState, useEffect  } from 'react';
// import {getet, getId, getInstitutions, getmt, getStatusEntidad, gitIdInstitution} from "../selectors/institutions";
// import {withRouter} from 'react-router-dom';
import {URL_BASE, URL_MARKETPLACE} from "../../constants";
import { Col, Row,Skeleton,Avatar, Button, List ,Modal,Spin,Pagination   } from 'antd';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
// import './style.css';
// import {fetchEmprendedor, fetchFuncionarioEmpren, fetchFuncionarios} from "../actions/fetchUsers";
// import {loadUser} from "../actions/auth";
import AppFrame from "../../components/AppFrame/AppFrame";
// import HomeUserEntidad from "../pages/HomeUserEntidad/HomeUserEntidad";
// import {selectCurrentUser} from "../selectors/users";
import CheckOutlined  from '@ant-design/icons/CheckOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import './scss/component-sm.scss'
import './scss/component-md.scss'
import './scss/component-lg.scss'
// {
//     id: 1,
//     title: 'Invoice 1',
//     amount: '$100',
//     date: '01/01/2020',
//     status: 'Paid',
//     type: 'Invoice',
//     description: 'This is a test invoice',
//     link: '#',
//     is_paid: true,

// },{
//     id: 2,
//     title: 'Invoice 2',
//     amount: '$100',
//     date: '01/01/2020',
//     status: 'Paid',
//     type: 'Invoice',
//     description: 'This is a test invoice',
//     link: '#',
//     is_paid: true,
// },{
//     id: 3,
//     title: 'Invoice 3',
//     amount: '$100',
//     date: '01/01/2020',
//     status: 'No paid',
//     type: 'Invoice',
//     description: 'This is a test invoice',
//     link: '#',
//     is_paid: false,
// }
const InvoicingPage = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [isModalVisiblePay, setIsModalVisiblePay] = useState(false);
    const [isModalVisibleView, setIsModalVisibleView] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [success, setSuccess] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [checked, setChecked] = useState(0);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [paidinvoices, setPaidinvoices] = useState(false);    
    const [invoiceShow, setInvoiceShow] = useState();
    const [next , setNext] = useState(null);
    const [prev , setPrev] = useState(null);
	// const location = useLocation();

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        
    if(params.get('success') === 'true'){
        setSuccess(true);
        setChecked(params.get('session_id'));
    }
    if(params.get('canceled') === 'true'){
        setCanceled(true);
    }
    },[])
    useEffect(() => {
     



        setIsLoading(true);
        fetch(`${URL_BASE}/entidad/facturacion/`,
        {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json()).then(data => {
            setNext(data.next);
            setPrev(data.previous);
            let invoices = data.results;
            
            setInvoices(invoices);
            
       
        })
        .catch(error => {
         
        }).finally(() => {
            setIsLoading(false);
            
        })
  
    },[])
         
    const showModalPay = () => {
        setIsModalVisiblePay(true);
    }

      const showModalView = (pk) => {
        setInvoiceShow(pk);
        setIsModalVisibleView(true);
      };
    
      const handleOkPay = () => {
        setIsModalVisiblePay(false);
      };
    
      const handleCancelView = () => {
       setIsModalVisibleView(false);
      };

    const handleCancelPay = () => {
        setIsModalVisiblePay(false);
    }
    const handleOkView = () => {
        setIsModalVisibleView(false);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     const handleSearch = (value) => {
        setIsLoading(true);
        fetch(value,
        {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json()).then(data => {
            setNext(data.next);
            setPrev(data.previous);
            let invoices = data.results;
       
            setInvoices(invoices);
            
       
        })
        .catch(error => {
         
        }).finally(() => {
            setIsLoading(false);
            
        })
     }
    
     
    const pay = (id) => {
   
        fetch(`${URL_BASE}/entidad/checkout/`,
        {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            contentType: 'application/json',
            
            body: JSON.stringify({
                "factura_id": id,
            })
        }).then(res => res.json()).then(data => {
      
       
          //open url 
            window.open(data.payment_link, '_blank');
            
       
        })
        .catch(error => {
         
        }).finally(() => {
          
           
        })
    }

    if(params.get('success')){
     
        // setTimeout(() => {

        //     window.location.replace(`facturacion`);
        // }, 3000);
        fetch(`${URL_BASE}/entidad/factura-checkout/`,
        {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "success":true,
                "canceled":false,
                "checkout_id":params.get('session_id'),
                })
        }).then(res => res.json()).then(data => {
            console.log(data);
          
            
       
        })
        .catch(error => {
            console.log(error);
        }).finally(() => {
            setPaidinvoices(true);
                  setTimeout(() => {

            window.location.replace(`facturacion`);
        }, 1000);
        })
        
        return (
            <div>
                  <AppFrame>

                    <h1>procesando pago</h1>
                    <div className="center-icon">
                        {
                            paidinvoices ? <CheckCircleOutlined style={{fontSize: '100px', color: '#52c41a'}} /> : <LoadingOutlined style={{fontSize: '100px', color: '#1890ff'}} />
                        }
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                   {/* <Spin  size="large" />
                   <CheckOutlined style={{
                        color: '00FF00',
                    }} /> */}
                   </div>
                  
                  </AppFrame>
            </div>
        )
    }
    if(isLoading ){
        return(
            <AppFrame>
                   <h1>Facturas</h1>
                   <div className="center-icon">
                   <Spin  size="large" />
                   </div>
        </AppFrame>
        )
    }
    if(!isLoading && invoices?.length === 0){
       
        return(
            <AppFrame>
                   <h1>Facturas</h1>
                no hay facturas
        </AppFrame>
        )
    }
    return (
        <AppFrame>
                 <h1>Facturas</h1>
                 <div className="invoice-select">
                 <p>id</p>
                                    <p>fecha de emision</p>
                                    <p>monto</p>
                                    <p>estado</p>
                                    <p>tipo</p>
                 </div>
                <div className="container-Section">
                    {
                    
                        invoices?.map((invoice,index) => {
                            return (
                                <div className="invoice" key={invoice.id}>
                                    <p>{invoice.pk}#</p>
                               
                                    <p>{ formatDate(invoice.fecha) }</p>
                           
                                    <p>{invoice.total_factura} $</p>
                                    <p className={invoice.pagada ? 'paid' : 'not-paid'}>{invoice.pagada ? "Si pagada" : "No pagada"}</p> 
                               
                                    {
                                        invoice.pagada ?
                                            <Button className="btn-s" onClick={() => showModalView(invoice)}>Ver</Button>
                                            :
                                            // <Button type="primary" onClick={showModalPay}>Pagar</Button>
                                            <Button className="btn-s" onClick={() => pay(invoice.pk)}>Pagar</Button>
                                    }
                                </div>
                            )
                        })
                    }


                </div>
        <Modal title="Pagar" visible={isModalVisiblePay} onOk={() =>{
            window.open('https://www.paypal.com/es/home', '_blank')
        }} okText="Pagar" onCancel={handleCancelPay}>
            
            <p>Sera rediridigo a otra pagina para pagar</p>

      </Modal>
      <Modal title="Ver" visible={isModalVisibleView} onOk={handleOkView} onCancel={handleCancelView}>
      <p>detalles</p>
        <p>id: {invoiceShow?.pk}</p>
        <p>fecha: {formatDate(invoiceShow?.fecha)}</p>
        <p>total: {invoiceShow?.total_factura} $</p>
        <p>concepto: {invoiceShow?.consumo[0]?.concepto}</p>
        <p>pagada: {invoiceShow?.pagada ? "Si" : "No"}</p>


      </Modal>
      
       <div className="pagi">
       {/* <Pagination  defaultCurrent={1} total={1} /> */}
       {
                                prev ?
                                    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                        <Button onClick={() =>handleSearch(prev)} className='btn-verde-basico' >
                                    anterior
                                        </Button>
                                    </Row>
                                    :
                                    <>    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                    <Button disabled className='btn-verde-basico' >
                                    anterior
                                    </Button>
                                </Row>
                                </>
                            }

                            {
                                next ?
                                    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                        <Button onClick={() => handleSearch(next)} className='btn-verde-basico' >
                                    siguiente
                                        </Button>
                                    </Row>
                                    :
                                    <>    <Row gutter={[16, 16]} align='middle' style={{marginTop: '2%'}}>
                                    <Button  disabled className='btn-verde-basico' >
                                    siguiente
                                    </Button>
                                </Row>
                                </>
                            }
       </div>
        </AppFrame>
    )
}

// const InvoicingPage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [initLoading, setInitLoading] = useState(true);
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);
//     const [list, setList] = useState([
//         {
//             "gender": "male",
//             "is_page" :  true,
//             "name": {
//               "title": "Mr",
//               "first": "Gregorio",
//               "last": "Nieto"
//             },
//             "email": "gregorio.nieto@example.com",
//             "picture": {
//               "large": "https://randomuser.me/api/portraits/men/5.jpg",
//               "medium": "https://randomuser.me/api/portraits/med/men/5.jpg",
//               "thumbnail": "https://randomuser.me/api/portraits/thumb/men/5.jpg"
//             },
//             "nat": "ES"
//           },
//           {
//             "gender": "male",
//             "is_page" :  true,
//             "name": {
//               "title": "Mr",
//               "first": "Gregorio",
//               "last": "Nieto"
//             },
//             "email": "gregorio.nieto@example.com",
//             "picture": {
//               "large": "https://randomuser.me/api/portraits/men/5.jpg",
//               "medium": "https://randomuser.me/api/portraits/med/men/5.jpg",
//               "thumbnail": "https://randomuser.me/api/portraits/thumb/men/5.jpg"
//             },
//             "nat": "ES"
//           },
//           {
//             "gender": "male",
//             "is_page" :  true,
//             "name": {
//               "title": "Mr",
//               "first": "Gregorio",
//               "last": "Nieto"
//             },
//             "email": "gregorio.nieto@example.com",
//             "picture": {
//               "large": "https://randomuser.me/api/portraits/men/5.jpg",
//               "medium": "https://randomuser.me/api/portraits/med/men/5.jpg",
//               "thumbnail": "https://randomuser.me/api/portraits/thumb/men/5.jpg"
//             },
//             "nat": "ES"
//           },
//           {
//             "gender": "male",
//             "is_page" :  true,
//             "name": {
//               "title": "Mr",
//               "first": "Gregorio",
//               "last": "Nieto"
//             },
//             "email": "gregorio.nieto@example.com",
//             "picture": {
//               "large": "https://randomuser.me/api/portraits/men/5.jpg",
//               "medium": "https://randomuser.me/api/portraits/med/men/5.jpg",
//               "thumbnail": "https://randomuser.me/api/portraits/thumb/men/5.jpg"
//             },
//             "nat": "ES"
//           }
//     ]);
//     return (
//         <AppFrame>
//             <h1>Facturas</h1>


//             {isLoading ?  <Skeleton active /> : 
//             <>
//                                  <List
//       className="demo-loadmore-list"
   
//       itemLayout="horizontal"
    
//       dataSource={list}
//       renderItem={(item) => (
//         <List.Item
//           actions={[<Button type='primary'>Pagar</Button>]}
//         >
//           <Skeleton avatar title={false} loading={item.loading} active>
//             <List.Item.Meta
//               avatar={<Avatar src={item.picture.large} />}
       
//               description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//             />
//             <div>pagado</div>
//           </Skeleton>
//         </List.Item>
//               )}
//               />
                
//               </>
//     }

//         </AppFrame>
//     )
// }

export default InvoicingPage;




// if(true){
//     const params = new URLSearchParams(window.location.search);

//     console.log('success');
        
//     if(params.get('success') === 'true'){
//     console.log('success');
//     fetch(`${URL_BASE}/entidad/factura-checkout/`,
//     {
//         method: 'PUT',
//         headers: new Headers({
//             'Authorization': `Token ${localStorage.getItem("token")}`,
//             'Content-Type': 'application/json'
//         }),
//         body: JSON.stringify({
//             "success":true,
//             "canceled":false,
//             "checkout_id":params.get('session_id'),
//         	})
//     }).then(res => res.json()).then(data => {
//         console.log(data);
      
        
   
//     })
//     .catch(error => {
//         console.log(error);
//     }).finally(() => {
     
        
//     })
//     }
//     if(params.get('canceled') === 'true'){
//         console.log('success');
//     }
    
// }