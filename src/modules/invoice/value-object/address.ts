export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _complement: string = "";
  private _city: string = "";
  private _state: string = "";
  private _zipCode: string = "";

  constructor(street: string, number: number, complement:string, city: string, state: string, zipCode: string) {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get complement(): string {
    return this._complement;
  }

  set complement(value: string) {
    this._complement = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  set zipCode(value: string) {
    this._zipCode = value;
  }
}
