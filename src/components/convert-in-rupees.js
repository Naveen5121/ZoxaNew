export default function ConvertIntoRupees(number) {
  const amount = parseFloat(number).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });

  return amount;
}
