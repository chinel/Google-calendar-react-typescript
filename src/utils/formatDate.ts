export function formatDate(date: Date, options?:Intl.DateTimeFormatOptions) {
  //Passing undefined will default to the current user's locale, e.g "es" for spanish will render spanish date
  return new Intl.DateTimeFormat(undefined, options).format(date)
}