/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observable } from 'mobx';
import createRouter, {
  Router, SubscribeFn, SubscribeState
} from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { injectable } from '@cloudbeaver/core-di';

@injectable()
export class RouterService {

  get route() {
    return this.currentRoute;
  }

  get params() {
    return this.currentParams;
  }

  readonly router: Router;

  @observable private currentRoute = '';
  @observable private currentParams: Record<string, any> = {};

  constructor() {
    this.router = createRouter();

    this.configure();
  }

  start() {
    this.router.start();
  }

  subscribe(subscriber: SubscribeFn) {
    return this.router.subscribe(subscriber);
  }

  private configure() {
    this.router.usePlugin(browserPlugin({
      useHash: true,
    }));

    this.router.subscribe(this.onRouteChange.bind(this));
  }

  private onRouteChange(state: SubscribeState) {
    this.currentRoute = state.route.name;
    this.currentParams = state.route.params;
  }
}
