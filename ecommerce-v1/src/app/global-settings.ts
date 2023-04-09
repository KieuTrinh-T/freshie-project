import { environment } from '@environment';

export class GlobalSettings {
  production: boolean;
  version: string;
  domain: string;
  server: string;
  apiVersion: string;
  token: string;

  constructor(production = false, version = '', domain = '', server = '', apiVersion = '', token = '') {
    this.production = production;
    this.version = version;
    this.domain = domain;
    this.server = server;
    this.apiVersion = apiVersion;
    this.token = token;
  }
}

export class GlobalSettingsBuilder {
  production!: boolean;
  version!: string;
  domain!: string;
  server!: string;
  apiVersion!: string;
  token!: string;

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

  build() {
    return new GlobalSettings(this.production, this.version, this.domain, this.server, this.apiVersion);
  }
}

export const GLOBAL_SETTINGS = new GlobalSettingsBuilder()
  .setProduction(environment.production)
  .setVersion(environment.version)
  .setDomain(environment.domain)
  .setServer(environment.server)
  .setApiVersion(environment.apiVersion)
  .setToken(environment.token)
  .build();
