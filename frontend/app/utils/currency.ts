type CurrencyInput = number | string

type CurrencyFormatOptions = Intl.NumberFormatOptions

const DEFAULT_LOCALE = 'id-ID'
const DEFAULT_CURRENCY = 'IDR'

export function formatCurrency(
  value: CurrencyInput,
  locale: string = DEFAULT_LOCALE,
  currency: string = DEFAULT_CURRENCY,
  options: CurrencyFormatOptions = {},
): string {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(numericValue)
}

export function formatNumber(
  value: CurrencyInput,
  locale: string = DEFAULT_LOCALE,
  options: CurrencyFormatOptions = {},
): string {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return ''
  }

  return new Intl.NumberFormat(locale, options).format(numericValue)
}
