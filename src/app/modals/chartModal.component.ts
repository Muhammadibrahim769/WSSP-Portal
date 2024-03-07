import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';


@Component({
    selector: 'app-chartModal',
    templateUrl: './chartModal.component.html'
})
export class ChartModalComponent implements OnInit {

    chartOptions: EChartsOption = {}
    kpiChartOptions: any;
    testOption: any;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any) { 
        this.kpiChartOptions = {
            title: {
              text: '',
              left: 'center'
            },
            legend: {
              data: [],
              bottom: 'left'
            },
            tooltip: {
              trigger: 'item',
              position: 'top'
            },
            toolbox: [{
                show: true,
                right: 'left',
                orient: 'vertical',
                feature: {
                  dataZoom: {
                    show: true,
                    // yAxisIndex: [0, 1],
                    // filterMode: 'filter'
                  },
                  dataView: {},
                  magicType: {
                    type: ["line", "bar", "stack"]
                  },
                  restore: {},
                  saveAsImage: {},
                }
              }],
            xAxis: {
                type: 'category',
                data: [],
                axisLabel: {
                  interval: 0,
                  rotate: 45
                }       
            },
            yAxis: {
              type: 'value',
              // minInterval: 1000000,
            },
            series: [],
            grid: [{
              top: 30,
              left: 20,
              bottom: 25,
              containLabel: true
            }]
          };
    }

    ngOnInit(){
        debugger
        let seriesData:any [] = [];
        if(this.data["data"]["numBranchA"]){seriesData.push(this.data["data"]["numBranchA"])
        }else seriesData.push(0);
        if(this.data["data"]["numBranchB"]){seriesData.push(this.data["data"]["numBranchB"])
        }else seriesData.push(0);
        if(this.data["data"]["numBranchC"]){seriesData.push(this.data["data"]["numBranchC"])
        }else seriesData.push(0);
        if(this.data["data"]["numBranchD"]){seriesData.push(this.data["data"]["numBranchD"])
        }else seriesData.push(0);
        if(this.data["data"]["numBranchHO"]){seriesData.push(this.data["data"]["numBranchHO"])
        }else seriesData.push(0);

        this.kpiChartOptions.title.text = this.data["data"]["txtKPIName"];
        this.kpiChartOptions.series = [{data: seriesData,type: 'bar'}];
        this.kpiChartOptions.xAxis.data = ['ZONE A', 'ZONE B', 'ZONE C', 'ZONE D', 'HEAD OFFICE'];
        this.chartOptions = this.kpiChartOptions;
    }


}