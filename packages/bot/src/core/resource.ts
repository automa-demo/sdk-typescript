import type { Automa } from '../client';

export class APIResource {
  protected _client: Automa;

  constructor(client: Automa) {
    this._client = client;
  }
}
