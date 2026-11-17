export const jobKeys = {
  all: ['job'],
  detail: () => [...jobKeys.all, 'detail'],
  list: () => [...jobKeys.all, 'list'],

  getJobById: (id: number) => [...jobKeys.detail(), { id }],
}