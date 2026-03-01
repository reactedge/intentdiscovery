export const formatMoney = (amount: number = 0) => {
    const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
    });

    return formatter.format(amount);
}


export const formatRange = (str: string) => {
    const prices = str.split('-')

    return `${formatMoney(prices[0])} - ${formatMoney(prices[1])}`
}
