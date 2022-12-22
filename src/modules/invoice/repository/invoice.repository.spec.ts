import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";
import Invoice from "../domain/invoice";
import Address from "../value-object/address";
import InvoiceRepository from "./invoice.repository";
import Product from "../domain/product";

describe("TransactionRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a invoice", async () => {
        const invoice = new Invoice({
            name: "Invoice test",
            document: "123456789",
            address: new Address("street", 123, "complement", "city", "state", "zipCode"),
            items: [new Product({
                name: "Product test",
                price: 100,
            })],
        })

        const repository = new InvoiceRepository();
        const result = await repository.generate(invoice);

        expect(result.id.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
    });

    it("should find a invoice", async () => {
        const invoice = new Invoice({
            name: "Invoice test",
            document: "123456789",
            address: new Address("street", 123, "complement", "city", "state", "zipCode"),
            items: [new Product({
                name: "Product test",
                price: 100,
            })],
        })

        const repository = new InvoiceRepository();
        await InvoiceModel.create({
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
                items: invoice.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                    invoiceId: invoice.id.id,
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{model: ProductModel}],
            });

        const result = await repository.find(invoice.id.id);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
    });
});
