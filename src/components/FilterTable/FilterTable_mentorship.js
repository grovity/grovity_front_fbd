import React, {Component, Fragment} from 'react'
import 'react-table-filter/lib/styles.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import moment from "moment";
import Moment from "react-moment";

const columns = [{
    dataField: 'nombre',
    text: 'Nombre de la sesión',
    sort: true,
    filter: textFilter()
}, {
    dataField: 'fecha_inicio',
    text: 'Fecha inicio',
}, {
    dataField: 'fecha_fin',
    text: 'Fecha fin',
    sort: true,
}, {
    dataField: 'url_zoom',
    text: 'Cuenta zoom',
    sort: true,
},

];


class FilterTable_mentorship extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            options: {
                paginationSize: 4,
                pageStartIndex: 1,
                // alwaysShowAllBtns: true, // Always show next and previous button
                // withFirstAndLast: false, // Hide the going to First and Last page button
                // hideSizePerPage: true, // Hide the sizePerPage dropdown always
                // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
                firstPageText: 'Primero',
                prePageText: 'Atras',
                nextPageText: 'Siguiente',
                lastPageText: 'Último',
                nextPageTitle: 'First page',
                prePageTitle: 'Pre page',
                firstPageTitle: 'Next page',
                lastPageTitle: 'Last page',
                showTotal: true,
                disablePageTitle: true,
                sizePerPageList: [{
                    text: '5', value: 5
                }, {
                    text: '10', value: 10
                }, {
                    text: '15', value: 10
                }, {
                    text: '20', value: 10
                }, {
                    text: 'Todos', value: this.props.users ? this.props.user.length : 0
                }] // A numeric array is also available. the purpose of above example is custom the text
            }

        }
    }
*/

    render() {

        return (
            <Fragment>

                <BootstrapTable id="tableUsers mb-3" keyField='id'
                                data={Array.isArray(this.props.eventos) ? this.props.eventos.map(c => (
                                        {
                                            nombre: `${c.nombre}`,
                                            fecha_inicio: <Moment
                                                format="YYYY/MM/DD h:mm A z" utc
                                                local>{moment(c.fecha_inicio).local('America/Bogota')}</Moment>,
                                            fecha_fin: <Moment
                                                format="YYYY/MM/DD h:mm A z" utc
                                                local>{moment(c.fecha_fin).local('America/Bogota')}</Moment>,
                                            url_zoom: <a href={c.url_zoom}>Link de zoom</a>

                                        }
                                    )
                                ) : []}
                                columns={columns} filter={filterFactory()} rowEvents={this.rowEvents}
                                pagination={paginationFactory()}/>
            </Fragment>
        )
    }

}

export default FilterTable_mentorship