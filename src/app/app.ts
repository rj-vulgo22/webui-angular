import { Component } from '@angular/core';
import { createElement } from 'react';
import { ThemeProvider } from '../react/lib/theme-provider';
import { IntroductionPage } from '../react/pages/introduction-page';

function AppRoot() {
  return createElement(ThemeProvider, null,
    createElement(IntroductionPage)
  );
}

@Component({
  selector: 'app-root',
  template: '<div reactHost [reactComponent]="AppRoot"></div>',
  standalone: false,
})
export class App {
  protected readonly AppRoot = AppRoot;
}