export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((prev, current) => prev + current.amount, 0);
};

export const toShekels = (num: number): string => {
  if (!num || num === 0) return '₪0.00';
  const shekels = num / 100;
  const addDecimals = twoDecimals(shekels);
  return addShekelSign(addSeperators(addDecimals));
};

export const toShekelsNoSign = (num: number): string => {
  if (!num || num === 0) return '0.00';
  const shekels = num / 100;
  const addDecimals = twoDecimals(shekels);
  return addSeperators(addDecimals);
};

export const addShekelSign = (num: string): string => `₪${num}`;

export const twoDecimals = (num: number): string => num.toFixed(2);

export const addSeperators = (num: string): string => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const sumInvoices = (invoices: Invoice[] | undefined, sign: boolean): string => {
  if (!invoices) return toShekels(0);
  const total = invoices.reduce(
    (prev, current) => prev + invoiceTotal(current.lineItems, current.discount),
    0
  );
  if (sign) return toShekels(total * 1.17);
  return toShekelsNoSign(total * 1.17);
};

export const shekelToAgorot = (shekel: number): number => shekel * 100;

export const invoiceTotal = (
  lineItems: LineItem[] | undefined,
  discount: number | undefined
): number => {
  const lineItemsSum = sumLineItems(lineItems);
  if (discount) {
    const invoiceDiscount = lineItemsSum * (discount / 100);
    return lineItemsSum - invoiceDiscount;
  }
  return lineItemsSum;
};
