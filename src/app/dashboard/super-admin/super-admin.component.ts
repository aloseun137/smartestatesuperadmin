import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EstateService } from 'src/app/services/estate/estate.service';
import { ResidentService } from 'src/app/services/residents/resident.service';
import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from 'ng-zorro-antd/skeleton';

declare let $: any;
declare let ApexCharts: any;
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  loading: any = false;
  errors: any = [];
  success: any = [];
  notify: string = '';
  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = false;
  buttonSize: NzSkeletonButtonSize = 'default';
  avatarSize: NzSkeletonAvatarSize = 60 ;
  inputSize: NzSkeletonInputSize = 'default';
  elementActive = true;
  buttonShape: NzSkeletonButtonShape = 'default';
  avatarShape: NzSkeletonAvatarShape = 'square';
  elementSize: NzSkeletonInputSize = 'large';

  estates: any;
  countAllEstate: any;
  residents: any;
  countAllResidents: any;
  estateIndex = 1;
  estateMeta: any;

  constructor(private residentService: ResidentService,
              private route: ActivatedRoute,
              private estateService: EstateService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const key1 = 'loggedin';
      console.log(params[key1]);
      if (params[key1] === 'success') {
        this.notify = 'You have been successfully loggedin. Welcome home';
      }
    });

  
    this.estateService.getEstatePaginate().subscribe(
        response => {
        this.estates = response.data;
        this.estateMeta = response.meta;
        this.countAllEstate = this.estateMeta.total;
        this.estateIndex = this.estateMeta.current_page;
    });


    // this.residentService.getResidents().subscribe(
    //   data => {
    //   const residents = data;
    //   this.residents = residents.data;
    //   this.countAllResidents = this.residents.countAll;
    // });

    // this.vendor();
    // this.customer();
  }


  vendor(){

    var options = {
      chart: {
        height: 280,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: true
      },
      series: [{
        name: 'Male',
        data: [44, 55, 41, 67, 22, 43, 21, 33, 49, 15, 26, 55]
      },{
        name: 'Female',
        data: [13, 23, 20, 8, 13, 27, 36, 22, 54, 28, 31, 26]
      }],
      xaxis: {
        type: 'month',
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      },
      legend: {
        offsetY: -7
      },
      fill: {
        opacity: 1
      },
      colors: ['#af772b', '#aaaaaa', '#434950', '#63686f', '#868a90'],
      tooltip: {
        y: {
          formatter: function(val: any) {
            return  "Visitors " + val + "k"
          }
        }
      },
    }
    var chart = new ApexCharts(
      document.querySelector("#visitors"),
      options
    );
    chart.render();
  }

  customer(){
    var options = {
      chart: {
        height: 193,
        type: 'donut',
      },
      labels: ['New', 'Returned'],
      legend: {
        show: false,
      },
      series: [450, 900],
      stroke: {
        width: 1,
      },
      colors: ['#af772b', '#aaaaaa', '#434950', '#63686f', '#868a90'],
    }
    var chart = new ApexCharts(
      document.querySelector("#customers"),
      options
    );
    chart.render();
  }

}

