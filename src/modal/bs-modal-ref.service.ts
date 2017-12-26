import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { ComponentLoader } from '../component-loader';
import { ModalContainerComponent } from './modal-container.component';
import { ModalOptions } from './modal-options.class';
import { BsModalService } from './bs-modal.service';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: any | null;

  /**
   * Hides the modal
   */
  modalService: BsModalService;
  onShow: EventEmitter<any> = new EventEmitter();
  onShown: EventEmitter<any> = new EventEmitter();
  onHide: EventEmitter<any> = new EventEmitter();
  onHidden: EventEmitter<any> = new EventEmitter();
  constructor(private modalContainerRef: ComponentLoader<ModalContainerComponent>, private config: ModalOptions) {
    this.modalContainerRef
      .provide({ provide: ModalOptions, useValue: config })
      .attach(ModalContainerComponent)
      .to('body');
  }

  show(content: string | TemplateRef<any> | any) {
      this.modalService.modalsCount++;
      this.modalService.loaders.push(this.modalContainerRef);
      this.modalService._showBackdrop();
      this.modalService.lastDismissReason = null;
      this.modalContainerRef.provide({ provide: BsModalRef, useValue: this });
      this.modalContainerRef.show({content, isAnimated: this.config.animated, bsModalService: this.modalService});
      this.modalContainerRef.instance.level = this.modalService.getModalsCount();
      this.content = this.modalContainerRef.getInnerComponent() || null;

      return this;
  }

  hide(): void {
    this.modalContainerRef.instance.hide();
  }
}

