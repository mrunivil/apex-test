import {
    ChartOptions, DEFAULT_CHART_CONTENT_OPTIONS, DEFAULT_CHART_X_AXIS_OPTIONS
} from 'src/core/chart.options';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { fixtures, WireEntity } from '../fixtures';

export type TimeLineViewModel = {
  chartOptions: ChartOptions;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  /**
   * View Related Data
   */
  currentZoomLevel = 0;
  currentStartDate = new Date(
    new Date().setHours(new Date().getHours() - 12, 0, 0, 0)
  );
  currentEndDate = new Date(
    new Date().setHours(new Date().getHours() + 12, 0, 0, 0)
  );

  data: Array<WireEntity> = fixtures;

  swimLanes: any;
  filteredData: WireEntity[] = [];
  studios: Array<string> = [];

  ngOnInit() {
    this.buildSwimLanes();
  }

  buildSwimLanes(): void {
    /**
     * limit data to visible
     */
    this.filteredData = this.data.filter((d) => {
      return (
        this.currentStartDate.getTime() < (d.endingDate?.getTime() ?? 0) &&
        this.currentEndDate.getTime() > (d.startingDate?.getTime() ?? 0)
      );
    });
    /**
     * group data by studios
     */
    this.swimLanes = {
      noStudio: [],
    };
    this.filteredData.forEach((d) => {
      if (d.isStudio) {
        this.swimLanes[`${d.sinkLabel!}`] = this.swimLanes[d.sinkLabel!] ?? [];
        this.swimLanes[`${d.sinkLabel!}`].push(d);
      } else {
        this.swimLanes.noStudio.push(d);
      }
    });
    this.studios = Array.from(Object.keys(this.swimLanes));
  }

  getSwimLanes() {
    return Array.from(Object.keys(this.swimLanes));
  }

  buildXAxisLegendChartOptions() {
    return {
      ...DEFAULT_CHART_X_AXIS_OPTIONS(
        this.currentStartDate,
        this.currentEndDate,
        'bottom'
      ),
    };
  }

  buildChartOptionsBySwimLane(lane: string) {
    const rows: WireEntity[][] = [];
    let earliestRowIndex = 0;
    this.filteredData.forEach((e) => {
      for (let x = 0; x < rows.length; x++) {
        const apps = rows[x];
        if (
          apps[apps.length - 1].endingDate!.getTime() <
          e.startingDate!.getTime()
        ) {
          earliestRowIndex = x;
          break;
        }
        if (x === rows.length - 1) {
          earliestRowIndex = rows.length;
        }
      }
      rows[earliestRowIndex] = [...(rows[earliestRowIndex] ?? []), e];
    });

    /**
     * set chartHeight based on count of rows in series
     */
    const chartHeight = rows.length * 48;

    /**
     * flatten multi dimensional array
     */
    const flatten: any[] = [];

    rows.forEach((row, index) =>
      row.forEach((e) =>
        flatten.push({
          x: `${'noStudio'}${index}`,
          y: [e.startingDate, e.endingDate],
          meta: [e.title, 'some Technology'],
        })
      )
    );

    const defaultChartOptions = {
      ...DEFAULT_CHART_CONTENT_OPTIONS(
        this.currentStartDate,
        this.currentEndDate
      ),
    };
    return {
      ...defaultChartOptions,
      series: [
        {
          name: lane,
          data: flatten,
        },
      ],
      chart: {
        ...defaultChartOptions.chart!,
        height: chartHeight,
      },
      xaxis: {
        ...defaultChartOptions.xaxis,
        min: this.currentStartDate.getTime(),
        max: this.currentEndDate.getTime(),
      },
    };
  }
}
