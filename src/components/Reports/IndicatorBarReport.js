import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";

import {AmchartsReact} from 'amchart4-react'

am4core.useTheme(am4themes_animated);

class IndicatorBarReport extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            chart: null,
            categoryAxis: null,
        }
    }

    componentDidMount() {
        if (!("tam" in this.props)) {
            this.setState({tam: 500});
        } else {
            this.setState({tam: this.props.tam});
        }
        let chart = am4core.create(this.props.nombre_div, am4charts.XYChart);

        this.createChart(chart);
        this.setState({chart: chart});
    }

    componentDidUpdate() {
        let chart = am4core.create(this.props.nombre_div, am4charts.XYChart);
        this.createChart(chart);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    createChart = (chart) => {
        chart.data = this.props.data;
        chart.language.locale = am4lang_es_ES;

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "puntaje";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.title.text = this.props.nametitleX;
        categoryAxis.title.fill = am4core.color("#00495D");
        categoryAxis.renderer.labels.template.fill = am4core.color("#00495D");
        categoryAxis.renderer.grid.template.disabled = true;


        let valueAxis4 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis4.min = 0;
        valueAxis4.extraMax = 0.1;
        valueAxis4.rangeChangeEasing = am4core.ease.linear;
        valueAxis4.title.text = this.props.nametitleY;
        valueAxis4.rangeChangeDuration = 1500;
        valueAxis4.title.fill =am4core.color("#00495D");
        valueAxis4.renderer.labels.template.fill = am4core.color("#00495D");
        

        let series4 = chart.series.push(new am4charts.ColumnSeries());
        series4.dataFields.categoryX = "puntaje";
        series4.dataFields.valueY = "cantidad";
        series4.tooltipText = "{valueY.value}"
        series4.columns.template.strokeOpacity = 0;
        series4.columns.template.column.cornerRadiusTopRight = 10;
        series4.columns.template.column.cornerRadiusTopLeft = 10;
        series4.fill = am4core.color("green");
        series4.minBulletDistance = 15;

        var labelBullet = series4.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = -10;
        labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

        chart.zoomOutButton.disabled = true;
        categoryAxis.renderer.grid.template.disabled = true;
        valueAxis4.renderer.grid.template.disabled = true;

        chart.cursor = new am4charts.XYCursor();
    }

    render() {
        return (
            <div>
                <div id={this.props.nombre_div} style={{width: "100%", height: `${this.state.tam}px`}}>
                    {this.state.chart ?
                        <AmchartsReact
                            chart={this.state.chart}
                            xAxis={this.state.categoryAxis}
                            color={am4core.color("#838383")}
                        />
                        : null}
                </div>
            </div>
        );
    }
}

export default IndicatorBarReport;