import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "../facade/invoice.facade";

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUsecase(invoiceRepository);
    const findUseCase = new FindInvoiceUsecase(invoiceRepository);
    const invoiceFacade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: findUseCase,
    });

    return invoiceFacade;
  }
}
