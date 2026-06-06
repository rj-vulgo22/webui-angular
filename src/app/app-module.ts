import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactHostDirective } from '../react/react-host.directive';
import { App } from './app';

@NgModule({
  declarations: [
    App,
    ReactHostDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
