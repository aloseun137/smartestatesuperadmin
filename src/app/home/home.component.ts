import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScriptService } from '../services/load-script/script.service';
import { AuthService } from './../auth/auth.service';

declare let $: any;
declare let ApexCharts: any;
declare var Pusher: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notify!: string;

  response: any;
  roleName: any;
  public user = {

    id: null,
    name: null,
    email: null,
    role: [],
  };
  getRole: any[] = [];
  role: any;
  routerlink: string = '';
  roleId: any;

  constructor(public auth: AuthService, 
              private scriptService: ScriptService, 
              private renderer: Renderer2,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const getProfile = this.auth.getProfile().subscribe(
      data => {
      this.response = data;
      const profile =  this.response.user;
      this.user.id = profile.id;
      this.user.role = profile.role;
      this.roleName = profile.role[0].slug;
      this.roleId = profile.role[0].id;
      console.log(this.roleName);
    });

    this.vendor();
    this.customer();
  }


  vendor(): void{

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
