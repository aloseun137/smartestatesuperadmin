import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  dataTableInstance: any;

  constructor() { }
  
  public static alert(alert_title?: any, alert_text?: any, alert_type?: any, showCancelButton = true, confBtn = 'Yes', ) {
    return swal({
      title: alert_title,
      text: alert_text,
      type: alert_type,
      showCancelButton: showCancelButton,
      confirmButtonClass: 'btn btn-primary',
      confirmButtonText: confBtn,
      cancelButtonClass: 'btn btn-danger'
    });
  }
  public openModal(id: any) {
    setTimeout(() => {
      (<any>$('#' + id)).modal({show: true, backdrop: 'true', keyboard: true});
    }, 20);
  }
  public closeModal(id: any) {
    (<any>$('#' + id)).modal('hide');
  }
  public startDatatable(id: any) {
    setTimeout(() => {
      this.initDataTable(id);
    }, 1000);
  }
  public initDataTable(id: any, responsive = true, destroy = 'destroy') {
    console.log('Is Destroy ', destroy);
    if (this.dataTableInstance && destroy === 'destroy') {
      console.log('DESTROYER ', this.dataTableInstance);
      this.dataTableInstance.destroy();
    }
    const buttons = ['pdf', 'print', 'excel', 'csv', 'copy'];
    setTimeout(() => {
      this.dataTableInstance = ($('#' + id)as any).DataTable({
        pagingType: 'full_numbers',
        dom: 'Blfrtip',
        keys: !0,
        buttons: buttons,
        // order: [[1, 'asc']],
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search...',
          paginate: {
            previous: '<i class=\'fa fa-angle-left\'>',
            next: '<i class=\'fa fa-angle-right\'>'
          }
        },
        select: {
          // style: 'multi'
        },
        columnDefs: [ {
          targets: 'no-sort',
          orderable: false,
        },
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: -1 }
        ],
        'lengthMenu': [
          [10, 25, 50, 150, -1],
          [10, 25, 50, 150, 'All'],
          // [50, 100, 150, -1],
          // [50, 100, 150, 'All']
        ],
        responsive: responsive,
      });
      $('.dt-buttons .btn').removeClass('btn-secondary').addClass('btn-sm btn-primary');
      // Add event listener for opening and closing details
      $(`#${id} tbody`).on('click', '.details-control', (e: any) => {
        const tr = (<any>$(this)).closest('tr');
        const row = this.dataTableInstance.row( tr );
        const target = $(`#${e.target.id}`);
        if ( row.child.isShown() ) {
          this.handleIconSwitch(target);
          tr.removeClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        } else {
          this.handleIconSwitch(target);
          tr.addClass('shown');
          $('.dtr-details').addClass('table-bordered table-hover table-striped');

        }
      });
    }, 400);

  }

  public handleIconSwitch(target: any) {
    if (target.hasClass('isShown')) {
      target.removeClass('isShown');
      target.addClass('isNotShown');
    } else {
      target.addClass('isShown');
      target.removeClass('isNotShown');
    }
  }
}
