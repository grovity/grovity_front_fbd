import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";

import {AmchartsReact} from 'amchart4-react'

import BasicModalWhite from "../BasicModalWhite/BasicModalWhite";
import IndicadorEditForm from "../IndicadorEditForm/IndicadorEditForm";

am4core.useTheme(am4themes_animated);

class IndicatorReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chart: null,
            dateAxis: null,
            showModal: false,
            contentModal: null,
        }

    }

    componentDidMount() {
        if (!("tam" in this.props)) {
            this.setState({tam: 500});
        } else {
            this.setState({tam: this.props.tam});
        }
        let chart = am4core.create(this.props.nombre_div, am4charts.XYChart);

        this.createChart(chart, this.openModal, this.state.showModal,
            this.props.nombre);
        this.setState({chart: chart});
    }

    componentDidUpdate() {
        let chart = am4core.create(this.props.nombre_div, am4charts.XYChart);
        this.createChart(chart, this.openModal, this.state.showModal,
            this.props.nombre);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    setShowModal = () => {
        this.setState({
            showModal: false
        })
    }
    openModal = async (content) => {
        await this.setState({
            showModal: true,
            contentModal: content,
        })

    };

    createChart = (chart, openModal, showModal, nombre) => {
        chart.data = this.props.data;
        chart.language.locale = am4lang_es_ES;


        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.labels.template.location = 1;
        dateAxis.title.text = this.props.nametitleX;
        dateAxis.title.fill = am4core.color("#00495D");
        dateAxis.renderer.labels.template.fill = am4core.color("#00495D");

        dateAxis.renderer.line.stroke = am4core.color("#d9d9d9");
        dateAxis.renderer.line.strokeOpacity = 1;
        dateAxis.renderer.line.strokeWidth = 1;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.title.text = this.props.nametitleY;
        valueAxis.title.fill = am4core.color("#00495D");
        valueAxis.renderer.labels.template.fill = am4core.color("#00495D");
        valueAxis.numberFormatter = new am4core.NumberFormatter();
        valueAxis.numberFormatter.numberFormat = '#.##';
        if (this.props.valueGoal) {
            var range = valueAxis.axisRanges.create();
            range.value = this.props.valueGoal;
            range.grid.stroke = am4core.color("#00495D");
            range.grid.strokeDasharray = 6;
            range.grid.strokeOpacity = 1;
            range.label.inside = true;
            range.label.text = "Meta";
            range.label.fill = range.grid.stroke;
            range.label.verticalCenter = "bottom";
        }
        if (this.props.baseLine) {
            var range = valueAxis.axisRanges.create();
            range.value = this.props.baseLine;
            range.grid.stroke = am4core.color("#CD5C5C");
            range.grid.strokeDasharray = 6;
            range.grid.strokeOpacity = 1;
            range.label.inside = true;
            range.label.text = "Línea base";
            range.label.fill = range.grid.stroke;
            range.label.verticalCenter = "bottom";
        }

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.stroke = am4core.color("#95C11F");

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;



        bullet.events.on("hit", function (event) {

            openModal(<IndicadorEditForm event={event.target.dataItem.dataContext}
                                         indicador={nombre}
                                         setShowModal={showModal}></IndicadorEditForm>)
            // console.log(event.target.dataItem.dataContext);
        });


    }

    render() {
        return (
            <div>

                <BasicModalWhite show={this.state.showModal} setShow={this.setShowModal}>
                    {this.state.contentModal}
                </BasicModalWhite>
                <div id={this.props.nombre_div} style={{width: "100%", height: `${this.state.tam}px`}}>
                    {this.state.chart ?
                        <AmchartsReact
                            chart={this.state.chart}
                            xAxis={this.state.dateAxis}
                            color={am4core.color("#838383")}
                        />
                        :  null}
                </div>

            </div>
        );
    }
}

export default IndicatorReport;


