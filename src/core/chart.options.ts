import {
    ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend,
    ApexNoData, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis
} from 'ng-apexcharts';

export const zoomLevelToMinutes = (zoomLevel: number) => {
  switch (zoomLevel) {
    case 0:
      return 120;
    case 1:
      return 60;
    case 2:
      return 30;
    case 3:
      return 10;
    case 4:
      return 5;

    default:
      return 120;
  }
};

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  fill?: ApexFill;
  legend?: ApexLegend;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  plotOptions?: ApexPlotOptions;
  noData?: ApexNoData;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  annotations?: ApexAnnotations;
  tooltip: ApexTooltip;
};

export const DEFAULT_CHART_X_AXIS_OPTIONS = (
  minDate: Date,
  maxDate: Date,
  position: 'top' | 'bottom'
): ChartOptions => ({
  series: [],
  chart: {
    type: 'rangeBar',
    height: 30,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    sparkline: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      barHeight: '0%',
      horizontal: true,
    },
  },
  xaxis: {
    type: 'datetime',
    min: minDate.getTime(),
    max: maxDate.getTime(),
    position,
    axisBorder: {
      show: false,
    },
    labels: {
      datetimeUTC: false,
    },
    tickAmount: 20,
  },
  grid: {
    show: false,
  },
  yaxis: {
    show: false,
    showAlways: false,
    showForNullSeries: false,
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  annotations: {},
  tooltip: {},
});

export const DEFAULT_CHART_CONTENT_OPTIONS = (
  minDate: Date,
  maxDate: Date
): ChartOptions => ({
  series: [],
  chart: {
    type: 'rangeBar',
    height: 0,
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  noData: {},
  grid: {
    show: true,
    borderColor: '#33333333',
    position: 'back',
    padding: {
      // left: -15,
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  plotOptions: {
    bar: {
      barHeight: `75%`,
      horizontal: true,
    },
  },
  stroke: {
    show: false,
  },
  legend: {
    show: false,
  },
  fill: {
    type: 'solid',
  },
  xaxis: {
    floating: true,
    type: 'datetime',
    labels: {
      show: false,
      datetimeUTC: false,
    },
    tickAmount: 20,
    min: minDate.getTime(),
    max: maxDate.getTime(),
  },
  yaxis: {
    show: false,
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: any, config: any) {
      return (
        config['w']['config']['series'][config.seriesIndex]['data'][
          config.dataPointIndex
        ]['meta'][0] +
        ' - ' +
        config['w']['config']['series'][config.seriesIndex]['data'][
          config.dataPointIndex
        ]['meta'][1]
      );
    },
  },
  annotations: {},
  tooltip: {},
});
