import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { createElement, type ComponentType, type ComponentProps } from 'react';
import { createRoot, type Root } from 'react-dom/client';

@Directive({
  selector: '[reactHost]',
  standalone: false,
})
export class ReactHostDirective implements OnInit, OnDestroy {
  private host: Root | null = null;
  private el: HTMLElement = inject(ElementRef).nativeElement;

  @Input() reactComponent?: ComponentType<any>;
  @Input() reactProps: ComponentProps<any> = {};

  ngOnInit() {
    if (!this.reactComponent) return;
    this.host = createRoot(this.el);
    this.host.render(
      createElement(this.reactComponent, this.reactProps)
    );
  }

  ngOnDestroy() {
    this.host?.unmount();
  }
}
