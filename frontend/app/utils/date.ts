type DateInput = Date | string | number

type DateFormatOptions = Intl.DateTimeFormatOptions

const DEFAULT_LOCALE = 'id-ID'

function isDateOnlyString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim())
}

export function toDate(value: DateInput): Date {
  if (value instanceof Date) {
    return new Date(value.getTime())
  }

  if (typeof value === 'string' && isDateOnlyString(value)) {
    const dateParts = value.split('-')

    if (dateParts.length !== 3) {
      return new Date(value)
    }

    const year = Number(dateParts[0])
    const month = Number(dateParts[1])
    const day = Number(dateParts[2])

    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

export function formatDate(
  value: DateInput,
  locale: string = DEFAULT_LOCALE,
  options: DateFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(toDate(value))
}

export function formatDateTime(
  value: DateInput,
  locale: string = DEFAULT_LOCALE,
  options: DateFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(toDate(value))
}

export function formatTime(
  value: DateInput,
  locale: string = DEFAULT_LOCALE,
  options: DateFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
): string {
  return new Intl.DateTimeFormat(locale, options).format(toDate(value))
}

export function formatDateISO(value: DateInput): string {
  return toDate(value).toISOString()
}
