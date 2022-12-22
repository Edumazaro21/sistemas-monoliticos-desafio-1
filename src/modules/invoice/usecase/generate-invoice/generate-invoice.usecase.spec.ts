import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import Address from "../../value-object/address";
import Product from "../../domain/product";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    price: 10
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    price: 20
});

const invoice = new Invoice({
    name: "invoice test",
    document: "123456789",
    address: new Address("street", 123, "complement", "city", "state", "12345-000"),
    items: [product1, product2],
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
};

describe("Generate invoice usecase unit test", () => {
    it("should generate a invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(invoiceRepository);
        const input = {
            name: "invoice test",
            document: "123456789",
            street: "street",
            number: 123,
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345-000",
            items: [{
                id: "1",
                name: "Product 1",
                price: 10
            },
                {
                    id: "2",
                    name: "Product 2",
                    price: 20
                }]
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.total).toBe(30);
    });
});
