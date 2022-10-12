import mobiscroll from "@mobiscroll/react";
import React from "react";
import './style.css'

class RenderMultiselectIndicadores extends React.Component {
    render() {
        const {data, onChange, defaultValue, placeholder} = this.props
        let tipo_masindicador = []
        if (data) {
            const indicadores = data.map(i => i.indicador.map(y => ({
                'text': `${i.nombre} - ${y.nombre}`,
                'value':y.id,
            })))
            for (let x in indicadores) {
                [...indicadores[x]].map(o => tipo_masindicador.push(o))
            }
        }
        /* if (data) {
             var indicadores = data
              console.log(indicadores)
             var tipos = [...data.map(i => [...i.tipo].map(x => `${x.nombre}-${x.id}`))].join()
             tipos = [...new Set(tipos.split(','))]
             var arreglo = []
             for (let i=0; i<indicadores.length; i++) {
               for (let j=0; j < tipos.length; j++) {
                   arreglo.push(`${indicadores[i].nombre}.${indicadores[i].id}[[tipo]]${tipos[j]}`)
               }
             }
         }*/

        return (
            <div id="selectcomponent">
                <mobiscroll.Form theme="ios" themeVariant="light">
                    <div className="mbsc-no-padding">
                        <div className="mbsc-justify-content-center">
                            <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                                <mobiscroll.FormGroup>
                                    <mobiscroll.Select
                                        id="multiselect"
                                        select="multiple"
                                        touchUi={false}
                                        height={50}
                                        width={800}
                                        multiline={2}
                                        headerText={'Selecciona los indicadores que deseas medir'}
                                        value={this.props.defaultValue ? this.props.defaultValue : []}
                                        data={tipo_masindicador ? tipo_masindicador : []}
                                        onSet={(_, e) => onChange(e)}
                                        className='text-white multiselect'
                                        placeholder={placeholder}
                                        groupLabel="&nbsp;"
                                        lang='es'
                                        filter={true}
                                        title={tipo_masindicador ? tipo_masindicador : ''}
                                        change={true}
                                    >
                                    </mobiscroll.Select>
                                </mobiscroll.FormGroup>
                            </div>
                        </div>
                    </div>
                </mobiscroll.Form>
            </div>
        )
    }
}

export default RenderMultiselectIndicadores;