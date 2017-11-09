import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective{
  @HostBinding('class.open') get openDirective() {
    return this.isOpen;
  };

  @HostListener('click') toggleOpen(){
    this.isOpen = true;
  }

  @HostListener('mouseleave') toggleClosed(){
    this.isOpen = false;
  }

  private isOpen: boolean = false;
}
