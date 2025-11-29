export const PAGE_DATA = {
  '/': {
    title: 'Rules',
    description: 'Rules page',
  },
  '/rule-documents/': {
    title: 'Rule Documents',
    description: 'Rule Documents page',
    breadcrumbs: [
      { label: 'Rules', href: '/' },
      { label: 'Rule Documents' },
    ],
  },
  '/rule-documents/$id': {
    title: 'Rule Document',
    description: 'Rule Document page',
    breadcrumbs: [
      { label: 'Rules', href: '/' },
      { label: 'Rule Documents', href: '/rule-documents/' },
      { label: 'Rule Document' },
    ],
  },
  '/general-documents/': {
    title: 'General Documents',
    description: 'General Documents page',
    breadcrumbs: [
      { label: 'General Documents' },
    ],
  },
  '/general-documents/$id': {
    title: 'General Document',
    description: 'General Document page',
    breadcrumbs: [
      { label: 'General Documents', href: '/general-documents/' },
      { label: 'General Document' },
    ],
  },
};