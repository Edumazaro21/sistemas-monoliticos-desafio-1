import {Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    // tslint:disable-next-line:variable-name
    declare invoice_id: string;
}