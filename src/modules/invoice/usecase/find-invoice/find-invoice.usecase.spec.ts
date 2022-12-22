import Id from "../../../@shared/domain/value-object/id.value-object";
import FindInvoiceUsecase from "./find-invoice.usecase";
import Invoice from "../../domain/invoice";
import Address from "../../value-object/address";
import Product from "../../domain/product";

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
  id: new Id("1"),
  name: "invoice test",
  document: "123456789",
  address: new Address("street", 123, "complement", "city", "state", "12345-000"),
  items: [product1,product2],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn()
  };
};

describe("Find invoice usecase unit test", () => {
  it("should get a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUsecase(invoiceRepository);
    const input = {
      id: "1"
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.createdAt).toBeDefined();
    expect(result.total).toBe(30);
  });
});
