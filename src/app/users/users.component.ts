import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { EstateService } from '../services/estate/estate.service';
import { environment as env } from 'src/environments/environment';
declare const $: any;

import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from 'ng-zorro-antd/skeleton';
import { UtilitiesService } from '../services/utilities/utilities.service';
import { UtilService } from '../services/Util-service/util.service';
import { StreetService } from '../services/street/street.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  errors: any = [];
  success: any = [];
  notify: string = '';
  roles: any;
  countAllRoles: any;
  estates: any;
  countAllRole: any;
  loading: any = false;

  buttonActive = false;
  avatarActive = false;
  inputActive = false;
  imageActive = false;
  buttonSize: NzSkeletonButtonSize = 'default';
  avatarSize: NzSkeletonAvatarSize = 250 ;
  inputSize: NzSkeletonInputSize = 'default';
  elementActive = true;
  buttonShape: NzSkeletonButtonShape = 'default';
  avatarShape: NzSkeletonAvatarShape = 'square';
  elementSize: NzSkeletonInputSize = 'large';

  public registrationForm = {
    id: '',
    surname: '',
    othernames: '',
    // gender: '',
    password: '',
    password_confirmation: '',
    email: '',
    role_id: '',
    estateCode: '',
    image: 'user.png',
    phone: ''
  };

  users: any;
  countAllUsers: any;
  metaUsers: any;
  imgname: any;
  imagefile: any;
  estateName: any;

  response: any;
  status: any;
  data: any;
  message: any;
  user: any;
  image: string = '';
  resData: any;
  userId: any;
  userStatus: any;
  userRole: any;
  roleName: any;
  roleId: any;
  estateCode: any;
  userIndex: any = 1;
  dataTableInstance: any
  loadingData: boolean = true
  streets: any[] = [];
  filterParams = {
    date_from: null,
    date_to: null,
    street: null,
  };
  private apiToCall: any = env.baseUrl +  "/user_datatable";

  constructor(
            private auth: AuthService,
            private router: Router,
            private estateService: EstateService,
            private streetService: StreetService,
            private fb: FormBuilder,
            private utilService: UtilService,
            private route: ActivatedRoute) { }

  ngOnInit(): void {    
    // this.initDataTable('users-table', this.apiToCall);
    this.getUserProfile();
    this.getEstates();
    this.getRoles();
    this.getStreets();
    this.auth.allUsers().subscribe(
      response => {        
      this.users = response.data;      
      // this.estateName = this.users[0].estate;
      this.metaUsers = response.meta;
    });
  }

  public getRoles() {
    this.auth.getRoles().subscribe(
      data => {
      const roles = data;
      this.roles = roles.data;
      this.countAllRoles = this.roles.length;
    });
  }

  public getStreets() {
    this.streetService.getStreet().subscribe(
  data => {
  const getStreets = data;
  this.streets = getStreets.data;
});
}

  public getEstates() {
    this.estateService.getEstate().subscribe(
      response => {
      this.estates = response.data;
      this.countAllRole = this.estates.length;
    });
  }

  public getUserProfile() {
    this.auth.getProfile().subscribe(
      data => {
      const profile =  data.user;
      this.userId = profile.id;
      this.userStatus = data.status;
      this.estateCode = profile.estate.estate_code;
      this.registrationForm.estateCode = this.estateCode;
      this.userRole = profile.role;
      this.roleName = profile.role[0].slug;
      this.roleId = profile.role[0].id;
    });
  }


  user_estate(id: any, name: any): void {
    this.users = null;
    this.estateName = name;
    this.auth.getUserByEstate(id).subscribe(
      data => {
      this.users = data.data;
      this.countAllUsers = this.users.length;
      this.metaUsers = this.response.meta;
    });
  }

  refreshUser(): void{
    this.registrationForm = {
      id: '',
      surname: '',
      othernames: '',
      // gender: '',
      password: '',
      password_confirmation: '',
      email: '',
      role_id: '',
      estateCode: '',
      image: 'user.png',
      phone: ''
    };
  }

  onSelectImg(event: any): void {
    if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.imgname = files.name;
      const reader = new FileReader();
      const vm = this;
      reader.onloadend = () => {
        this.imagefile = reader.result;
        this.registrationForm.image = this.imagefile;
      };
      reader.readAsDataURL(files);
    }
  }

  getUser(id: any): void {
    this.errors = [];
    this.auth.getUser(id)
      .subscribe(
        data => {
          const profile =  data.data;
          this.registrationForm.id = profile.id;
          this.registrationForm.surname = profile.surname;
          this.registrationForm.othernames = profile.othernames;
          // this.registrationForm.gender = profile.gender;
          // this.registrationForm.estateCode = profile.estateCode;
          this.registrationForm.email = profile.email;
          this.image = profile.image;
          this.registrationForm.image = '';
          this.registrationForm.phone = profile.phone;
          this.registrationForm.role_id = profile.role_id;
          console.log(this.user);
        },
    error => this.handleError(error)
    );
  }

  onRegister(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.registrationForm);
    this.auth.createUser(this.registrationForm)
      .subscribe(
        data => {
          this.handleResponse(data);
          this.utilService.closeModal('addNewContact');
        },
        error => this.handleError(error)
      );
  }

  updateProfile(): void {
    this.errors = [];
    console.log(this.registrationForm);
    this.auth.updateProfile(this.registrationForm)
      .subscribe(
        data => {
          console.log(data);
          this.response = data.title;
          this.status = data.status;
          this.message = data.message;
          this.data = data.data;
          this.user = this.data.user;
          this.errors = [];
          this.success.push(this.status);
          this.success.push(this.message);
        },
        error => this.handleError(error)
      );
  }

  handleResponse(data: any): void {
    this.loading = false;
    console.log(data);
    this.response = data.title;
    this.status = data.status;
    this.message = data.message;
    this.errors = [];
    this.success.push(this.status);
    this.success.push(this.message);
    this.refreshUser();
    ($('#users-table')as any).DataTable().ajax.reload();
    // this.ngOnInit();
  }

  handleError(error: any): void {
    this.loading = false;
    console.log(error);
    this.success = [];
    this.response = error.error.data;
    this.status = error.error.status;
    this.message = error.error.message;
    this.errors.push(this.message);
  }

  public pagination(e: any): void{
    const id = e.target.innerText;

    if (id === '>>') {
      this.userIndex = + this.userIndex + 4;
    }
    else if (id === '<<') {
      this.userIndex = + this.userIndex - 4;
    } else if (id === 'Next') {
      this.userIndex = + this.userIndex + 1;
    } else if (id === 'Previous') {
      this.userIndex = + this.userIndex - 1;
    } else {
      this.userIndex = id;
    }
    this.auth.getUserPaginate(this.userIndex).subscribe(
      data => {
      this.users = data.data;
      this.countAllUsers = data.data.length;
    });
  }

  public initDataTable(id: any, apiToCall:string, destroy = 'destroy') {
    $("#users-table").off();
    if (this.dataTableInstance && destroy === 'destroy') {
      this.dataTableInstance.clear();
      this.dataTableInstance.destroy();
    }
    console.log('Is Destroy ', destroy);
    const buttons = ['pdf', 'print', 'excel', 'csv', 'copy'];
    setTimeout(() => {
      this.loadingData = false;
      this.dataTableInstance = ($('#' + id)as any).DataTable({
        pagingType: 'full_numbers',
        dom: 'Blfrtip',
        keys: !0,
        buttons: buttons,
        // order: [[1, 'asc']],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search...',
          processing: 'Loading data',
          paginate: {
            previous: '<i class=\'fa fa-angle-left\'>',
            next: '<i class=\'fa fa-angle-right\'>'
          }
        },

        "processing": true,
        "serverSide": true,
        "initComplete": function( settings: any, json: any ) {
        },
  
        "scrollX": true,

      "ajax": {
          "url": apiToCall,
          "headers": {
            "Authorization": "Bearer " + localStorage.getItem('auth_tkn')
          },
          "type": "POST",
          // "json": true,
          // "contentType": "application/json",
          "dataType": 'json',
          // contentType: "application/json; charset=utf-8",
          // traditional: true,
        },
        "columns":  [
          // { "data": "responsiveness" },
          { "data": "sno" },
          { "data": "name"},
          { "data": "email"},
          { "data": "phone"},
          { "data": "role"},
          { "data": "action" }
        ],
        'lengthMenu': [
          [10, 25, 50, 150, -1],
          [10, 25, 50, 150, 'All'],
          // [50, 100, 150, -1],
          // [50, 100, 150, 'All']
        ],
        columnDefs: [ {
          targets: 'no-sort',
          orderable: false,
        },
          // { responsivePriority: 1, targets: 0 },
          // { responsivePriority: 2, targets: -1 }
        ],
      });
      $('.dt-buttons .btn').removeClass('btn-secondary').addClass('btn-sm btn-primary');
      // Add event listener for opening and closing details
      $(`#${id} tbody`).on('click', '.details-control', (e: any) => {
        const tr = (<any>$(this)).closest('tr');
        const row = this.dataTableInstance.row( tr );
        const target = $(`#${e.target.id}`);
        if ( row.child.isShown() ) {
          this.utilService.handleIconSwitch(target);
          tr.removeClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        } else {
          this.utilService.handleIconSwitch(target);
          tr.addClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        }
      });
      $('#users-table').on('click', 'td button', (e: any) => {
        const target =/* e.target ||*/ e.currentTarget;
        const splits = target.id.split('__');
        console.log('Splits ', splits, splits[1]);
        if(splits[0] === 'update') {
          console.log(target, 'test taeget');
          this.getUser(parseInt(splits[1], 10))
          this.utilService.openModal('editContact');
        } else if(splits[0] === 'details') {
          // this.open(parseInt(splits[1], 10))    
        }else {
          // return false;
        }
      });
    }, 400);
  }

  public filterUsers() {
    this.apiToCall = env.baseUrl +  "/user_datatable";
    this.apiToCall = `${this.apiToCall}?street=${this.filterParams.street}&date_from=${this.filterParams.date_from}&date_to=${this.filterParams.date_to}`;
    this.initDataTable('users-table', this.apiToCall);
  }
  
  public clearFilters() {
    this.filterParams = {
      street: null,
      date_from: null,
      date_to: null
    };
    this.apiToCall = env.baseUrl +  "/resident_datatable";
    this.apiToCall = `${this.apiToCall}?street=${this.filterParams.street}&date_from=${this.filterParams.date_from}&date_to=${this.filterParams.date_to}`;
    this.initDataTable('users-table', this.apiToCall);
  }

}