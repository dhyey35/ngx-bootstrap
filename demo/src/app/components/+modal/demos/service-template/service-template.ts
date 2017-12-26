import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'demo-modal-service-static',
  templateUrl: './service-template.html'
})
export class DemoModalServiceStaticComponent {
  modalRef: BsModalRef;
  prebuiltModal: any;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(this.modalRef);
  }

  prebuild(template: TemplateRef<any>) {
    this.prebuiltModal = this.modalService.createModalContainerRef(template);
    console.log(this.prebuiltModal);
    ['onShow', 'onShown', 'onHide', 'onHidden'].forEach((e: string) => {
      this.prebuiltModal[e].subscribe((item: any) => {
        console.log(e, item);
      });
    });
  }
}
