import { GLOBAL_SETTINGS } from '@global-settings';
import { IUser } from '@common/models';

export const AnonymousUser: IUser = {
  _id: '',
  name: '',
  address: '',
  email: '',
  phoneNumber: '',
  role: ''
}

export class AppState {
  production: boolean;
  version: string;
  domain: string;
  server: string;
  apiVersion: string;
  ready: boolean;
  token: string;
  me: IUser;
  theme: string;

  constructor(
    production = false,
    version = '',
    domain = '',
    server = '',
    apiVersion = '',
    ready = false,
    token = '',
    me = AnonymousUser,
    theme = 'light'
  ) {
    this.production = production;
    this.version = version;
    this.domain = domain;
    this.server = server;
    this.apiVersion = apiVersion;
    this.ready = ready;
    this.token = token;
    this.me = me;
    this.theme = theme;
  }
}

export class AppStateBuilder {
  production!: boolean;
  version!: string;
  domain!: string;
  server!: string;
  apiVersion!: string;
  token!: string;
  ready!: boolean;
  me!: IUser;
  theme!: string;

  setProduction(value = false) {
    this.production = value;
    return this;
  }

  setVersion(value = '') {
    this.version = value;
    return this;
  }

  setDomain(value = '') {
    this.domain = value;
    return this;
  }

  setServer(value = '') {
    this.server = value;
    return this;
  }

  setApiVersion(value = '') {
    this.apiVersion = value;
    return this;
  }

  setToken(value = '') {
    this.token = value;
    return this;
  }

  setReady(value = false) {
    this.ready = value;
    return this;
  }

  setMe(value = AnonymousUser) {
    this.me = value;
    return this;
  }

  setTheme(value = 'light') {
    this.theme = value;
    return this;
  }

  build() {
    return new AppState(this.production, this.version, this.domain, this.server, this.apiVersion, this.ready, this.token, this.me, this.theme);
  }
}

export const INITIAL_STATE = new AppStateBuilder()
  .setProduction(GLOBAL_SETTINGS.production)
  .setVersion(GLOBAL_SETTINGS.version)
  .setDomain(GLOBAL_SETTINGS.domain)
  .setServer(GLOBAL_SETTINGS.server)
  .setApiVersion(GLOBAL_SETTINGS.apiVersion)
  .setToken(GLOBAL_SETTINGS.token)
  .build();
