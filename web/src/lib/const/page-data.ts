export const PAGE_DATA = {
  '/rules/': {
    description: 'Rule Definitions',
    breadcrumbs: [
      { label: 'Rules' },
    ],
  },
  '/rules/$id': {
    description: 'Manage Rule Definition',
    breadcrumbs: [
      { label: 'Rules', href: '/rules/' },
      { label: 'Rule' },
    ],
  },
  '/rule-documents/': {
    description: 'Rule Documents',
    breadcrumbs: [
      { label: 'Rules', href: '/' },
      { label: 'Rule Documents' },
    ],
  },
  '/rule-documents/$id': {
    description: 'Manage Rule Document',
    breadcrumbs: [
      { label: 'Rules', href: '/' },
      { label: 'Rule Documents', href: '/rule-documents/' },
      { label: 'Rule Document' },
    ],
  },
  '/general-documents/': {
    description: 'General Documents',
    breadcrumbs: [
      { label: 'General Documents' },
    ],
  },
  '/general-documents/$id': {
    description: 'Manage General Document',
    breadcrumbs: [
      { label: 'General Documents', href: '/general-documents/' },
      { label: 'General Document' },
    ],
  },
};