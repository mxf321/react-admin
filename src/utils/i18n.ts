import i18next from 'i18next'

export const generateTitle = (title: string) => {
  return i18next.t('route.' + title)
}
