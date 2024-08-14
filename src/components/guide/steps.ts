import i18next from 'i18next'
const steps = () => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: i18next.t('guide.guideTitle'),
        description: i18next.t('guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18next.t('guide.hamburgerTitle'),
        description: i18next.t('guide.hamburgerDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18next.t('guide.breadcrumbTitle'),
        description: i18next.t('guide.breadcrumbDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18next.t('guide.searchTitle'),
        description: i18next.t('guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18next.t('guide.fullTitle'),
        description: i18next.t('guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18next.t('guide.themeTitle'),
        description: i18next.t('guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18next.t('guide.langTitle'),
        description: i18next.t('guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tag',
      popover: {
        title: i18next.t('guide.tagTitle'),
        description: i18next.t('guide.tagDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18next.t('guide.sidebarTitle'),
        description: i18next.t('guide.sidebarDesc'),
        position: 'bottom-right'
      }
    }
  ]
}
export default steps
