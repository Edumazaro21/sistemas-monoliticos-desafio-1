import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceInputDto, GenerateInvoiceOutputDto} from "./generate-invoice.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../value-object/address";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceInputDto
  ): Promise<GenerateInvoiceOutputDto> {
    const props = {
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode,
      ),
      items: input.items.map((item) => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    }

    const invoice = await this.invoiceRepository.generate(new Invoice(props));

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price
        }
      }),
      total: invoice.items.reduce((acc, item) => {return acc + item.price}, 0),
    };
  }
}
