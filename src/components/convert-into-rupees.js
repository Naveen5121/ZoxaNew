export default function ConvertIntoRupees(number) {
  const value = typeof number === 'string' ? number?.replace(/,/g, '') : number;

  const amount = parseFloat(value).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

  return amount;
}
