import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Product from "./product";

type InvoiceProps = {
  id?: Id;
  name: string
  document: string
  items: Product[]
  address: Address
  createdAt?: Date
  updateAt?: Date
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: Product[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updateAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get document(): string {
    return this._document;
  }

  set document(value: string) {
    this._document = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  get items(): Product[] {
    return this._items;
  }

  set items(value: Product[]) {
    this._items = value;
  }
}
