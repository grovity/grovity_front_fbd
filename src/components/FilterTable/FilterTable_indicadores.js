import React, {Component, Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {URL_BASE} from "../../constants";
import {fetchEmpresaEmprendedor, fetchUsersbyId} from "../../actions/fetchUsers";
import {connect} from "react-redux";
import {loadUser} from "../../actions/auth";
import {
   selectEmpresa_indicadores
} from "../../selectors/users";
import {toast} from "react-toastify";


const columns = [{
    dataField: 'indicadores',
    text: 'Indicadores seleccionados',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'linea_base',
    text: 'Linea Base',
}, {
    dataField: 'meta',
    text: 'Meta',
    sort: true,
}, {
    dataField: 'nombre_ejex',
    text: 'Nombre eje X',
    sort: true,
}, {
    dataField: 'nombre_ejey',
    text: 'Nombre eje Y',
    sort: true,
},
];


class FilterTable_indicadores extends Component {

    // rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         window.location.href = `${this.props.urlPath}${row.username}`
    //     }
    // };

    async componentDidMount() {
        await this.props.fetchEmpresaEmprendedor()
        this.props.fetchUsersbyId(this.props.id);
    }


    EnviarLineabaseMeta = async () => {
        let valores = document.querySelectorAll("tr")
        let flag = 0;
        let count = 0;
        for (let i = 1; i < valores.length; i++) {
            let a = valores[i].querySelectorAll('input')
            let obj = {'linea_base': a[0].value, 'meta': a[1].value, 'eje_x': a[2].value, 'eje_y': a[3].value}
            try {
                if (a[0].value && a[1].value) {
                    const request = await fetch(`${URL_BASE}/empresa/emprendedor/${a[0].id}/actualizar `, {
                        method: 'PUT',
                        headers: new Headers({
                            'Authorization': `Token ${localStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(obj),
                    });
                    await request.json();
                    if (request.status === 200) {
                        count++
                        flag = 2
                        valores[i].style.borderRight = '5px solid #95C11F'
                    } else {
                        flag = 1
                        valores[i].style.borderRight = '5px solid #e0245e'
                    }

                } else {
                    valores[i].style.borderRight = '5px solid #e0245e'

                }

            } catch (err) {

            }
        }
        if (count === (valores.length - 1) ){
            toast.success("Se han enviado correctamente todos los valores")
        } else {
            toast.error("Algunos de los indicadores no fueron actualizados, verifica que no estés modificando la línea base")
        }
    };

    render() {
        let indicadores_array = []
        if (this.props.indicadores) {
            for (let i = 0; i < this.props.indicadores.length; i++) {
                for (let j = 0; j < this.props.indicadores[i].indicador.length; j++) {
                    indicadores_array.push({
                        'id': this.props.indicadores[i].indicador[j].id,
                        'nombre': `${this.props.indicadores[i].nombre} - ${this.props.indicadores[i].indicador[j].nombre}`,
                        'linea_base': this.props.indicadores[i].indicador[j].linea_base,
                        'meta': this.props.indicadores[i].indicador[j].meta,
                        'eje_x': this.props.indicadores[i].indicador[j].eje_x,
                        'eje_y': this.props.indicadores[i].indicador[j].eje_y,
                    })
                }
            }
        }
        return (
            <Fragment>

                <BootstrapTable id="tableUsers mb-3" keyField='id'
                                data={indicadores_array ? indicadores_array.map(c => (

                                        {

                                            indicadores: `${c.nombre}`,
                                            linea_base: <input id={c.id} type='number' defaultValue={c.linea_base}
                                                               className='indicadoresInput'></input>,
                                            meta: <input type='number' defaultValue={c ? c.meta : 0}
                                                         className='indicadoresInput'></input>,
                                            nombre_ejex: <input type='text' defaultValue={c.eje_x}
                                                                className='indicadoresInput'></input>,
                                            nombre_ejey: <input type='text' defaultValue={c.eje_y}
                                                                className='indicadoresInput'></input>

                                        }

                                    )
                                ) : []}
                                columns={columns} filter={filterFactory()}
                                pagination={paginationFactory()}/>

                <button id="uservolver" className='mt-3 mb-5' onClick={this.EnviarLineabaseMeta}>
                    Enviar
                </button>
            </Fragment>
        )
    }

}

const mapStateToProps = (state, props) => ({
    indicadores: selectEmpresa_indicadores(state),
});


export default connect(mapStateToProps, {fetchEmpresaEmprendedor, loadUser, fetchUsersbyId})(FilterTable_indicadores)