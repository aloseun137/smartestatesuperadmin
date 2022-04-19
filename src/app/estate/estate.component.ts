import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { EstateService } from '../services/estate/estate.service';
import { UtilitiesService } from '../services/utilities/utilities.service';
import { ProfileService } from './../services/profile/profile.service';
import { ResidentService } from '../services/residents/resident.service';
import  * as testbanks from 'ng-banks';
// @ts-ignore
import  NaijaStates from 'naija-state-local-government';

import {
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonButtonShape,
  NzSkeletonButtonSize,
  NzSkeletonInputSize
} from 'ng-zorro-antd/skeleton';
declare let notify2: any;
declare let $: any;

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.css']
})
export class EstateComponent implements OnInit {
  visible = false;
  childrenVisible = false;
  switchTabs = false;
  tabStatus = 'active';
  tabStatus2 = 'inactive';
  isVisible = false;
  isOkLoading = false;

  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  errors: any = [];
  success: any = [];
  notify: string = '';
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

  statusFormData: any = {};
  public registrationForm = {
    estate_name: '',
    lga: '',
    state: '',
    plan: '',
    website_name: '',
    email: '',
    bank: '',
    address: '',
    logo: null,
    phone_number: '',
    contact_person_first_name: '',
    contact_person_last_name: '',
    contactphone: '',
    contactemail: '',
    account_name: '',
    account_number: '',
    // alternatePhone: '',
    // accountVerified: false,
    // status: null
  };
  estateCode:any;
  estates: any;
  countAllUsers: any;
  metaUsers: any;
  imgname: any;
  imagefile: any;
  bankName: any;
  stateName: any;

  response: any;
  status: any;
  data: any;
  message: any;
  user: any;
  image: string = '';
  user_Profile: any;
  cities: any;
  countries: any;
  banks: any;
  states: any;
  estateName: any;
  estateId: any;
  residentName: any;
  estateResidents: any;
  countAllEstateResidents: any;
  estateIndex = 1;
  estateMeta: any;

  constructor(
            private auth: AuthService,
            private estateService: EstateService,
            private utilitiesService: UtilitiesService,
            private residentService: ResidentService,
            private userProfile: ProfileService,
            private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.states = NaijaStates.states();            
    this.banks = testbanks.default.getBanks();

    this.estateService.getEstatePaginate().subscribe(
      response => {
      this.estates = response.data;      
      this.estateMeta = response.meta;
      this.countAllUsers = this.estateMeta.total;
      this.estateIndex = this.estateMeta.current_page;
    });

  }

  pagination(e: any): void{
    const id = e.target.innerText;

    if (id === '>>') {
      this.estateIndex = Number(this.estateIndex) + 5;
    }
    else if (id === '<<') {
      this.estateIndex = Number(this.estateIndex) - 5;
    } else if (id === 'Next') {
      this.estateIndex = Number(this.estateIndex) + 1;
    } else if (id === 'Previous') {
      this.estateIndex = Number(this.estateIndex) - 1;
    } else {
      this.estateIndex = id;
    }

    this.estateService.getEstateAllPaginate(this.estateIndex).subscribe(
      response => {
        this.estates = response.data;
        this.estateMeta = response.meta;
        this.countAllUsers = this.estateMeta.total;
        this.estateIndex = this.estateMeta.current_page;
      });

  }

  open(id: any, name: any): void {
    // this.userProfile.getProfile();
    this.refreshUser();
    this.visible = true;
    this.getEstate(id);
    this. estateName = name;

  }

  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  switch(value: any): void{
    this.switchTabs = value;

    if(this.switchTabs){
      this.tabStatus = 'inactive';
      this.tabStatus2 = 'active';
    }else{
      this.tabStatus = 'active';
      this.tabStatus2 = 'inactive';
    }
  }


  refreshUser(): void{
    this.errors = [];
    this.success = [];
    this.registrationForm = {
    estate_name: '',
    lga: '',
    state: '',
    plan: '',
    website_name: '',
    email: '',
    bank: '',
    address: '',
    logo: null,
    phone_number: '',
    contact_person_first_name: '',
    contact_person_last_name: '',
    contactphone: '',
    contactemail: '',
    account_name: '',
    account_number: '',
    // alternatePhone: '',
    // accountVerified: false,
    // status: null
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
        this.registrationForm.logo = this.imagefile;
      };
      reader.readAsDataURL(files);
    }
  }

  getEstate(id: string): void {
    this.errors = [];
    this.success = [];
    this.estateService.getEstateDetailes(id)
      .subscribe(
        data => {
          const profile =  data.data;
          // this.registrationForm.tenantid = profile.tenantid;
          // this.registrationForm.tenant = profile.tenant;
          const {estate_name,lga, state, id} = profile
          this.registrationForm.estate_name = estate_name;
          this.estateId = profile.id;
          this.registrationForm.lga = lga;
          this.registrationForm.state = state;
          this.registrationForm.email = profile.email;
          this.estateCode = profile.estateCode;
          this.registrationForm.bank = profile.bank;
          this.bankName = profile.bank;
          this.stateName = profile.state;
          this.registrationForm.address = profile.address;
          this.imgname = profile.imageName;
          this.imagefile = profile.imageName;
          this.registrationForm.logo = null;
          this.registrationForm.phone_number = profile.phone_number;
          this.registrationForm.account_number = profile.accountno;
          this.registrationForm.contact_person_first_name = profile.contact_person_first_name;
          this.registrationForm.contact_person_last_name = profile.contact_person_last_name;
          this.registrationForm.contactphone = profile.contactphone;
          this.registrationForm.contactemail = profile.contactemail;
          this.registrationForm.account_number = profile.account_number;
          this.registrationForm.account_name = profile.account_name;
          // this.registrationForm.alternatePhone = profile.alternatePhone;
          // this.registrationForm.accountVerified = profile.accountVerified;
          // this.registrationForm.status = profile.status;
          this.residentByEstate(profile.id);
          console.log(this.registrationForm);
        },
    error => this.handleError(error)
    );
  }


  selectState(): void{
    
    this.cities = NaijaStates.lgas(this.registrationForm.state).lgas;  
  }

  residentByEstate(id: any): void{
    this.residentService.getResidentsByEstateId(id).subscribe(
      data => {
      const residents = data;
      this.estateResidents = residents.data;
      this.countAllEstateResidents = this.estateResidents.countAll;
      // const notis2 = new notify2('fader', 'success', 'Success', 'Data Provided');
    });
  }

  onRegister(): void {
    this.loading = true;
    const userProfile = this.userProfile.getProfile();
    this.user_Profile = userProfile.id;
    this.errors = [];
    console.log(this.registrationForm);
    this.estateService.createEstate(this.registrationForm)
      .subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
  }

  updateEstate(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.registrationForm);
    this.estateService.editEstate(this.registrationForm)
      .subscribe(
        data => {
          this.loading = false;
          this.response = data.title;
          this.status = data.status;
          this.message = data.message;
          this.data = data.data;
          this.user = this.data.user;
          this.errors = [];
          this.success.push(this.status);
          this.success.push(this.message);

          $('#editContact').modal('hide');
        },
        error => this.handleError(error)
      );
  }

  showStatusModal(): void {
    // this.isVisible = true;
  }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 3000);
  // }

  changeStatus(): void {
    this.loading = true;
    this.errors = [];
    console.log(this.statusFormData);
    this.estateService.updateEstateStatus(this.statusFormData)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
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
    this.status = 'success';
    this.message = data.message;
    const notis2 = new notify2('fader', 'success', this.status, this.message);
    this.errors = [];
    this.success.push(this.status);
    this.success.push(this.message);

    $('#addNewContact').modal('hide');
    $('#deleatStatusBasicModal').modal('hide');

    this.refreshUser();
    this.ngOnInit();
    // this.router.navigate(['/auth/login'], { queryParams: { registered: 'success' } });

  }

  handleError(error:any): void {
    this.loading = false;
    console.log(error);
    this.success = [];
    this.response = error.error.title;
    this.status = error.error.status;
    this.message = error.error.message;
    this.errors.push(this.message);
    const notis2 = new notify2('fader', 'error', 'Error', this.message);

  }
}
