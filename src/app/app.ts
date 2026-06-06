import { Component } from '@angular/core';
import { DemoPage } from '../react/pages/demo-page';

@Component({
  selector: 'app-root',
  template: '<div reactHost [reactComponent]="DemoPage"></div>',
  standalone: false,
})
export class App {
  protected readonly DemoPage = DemoPage;
}
