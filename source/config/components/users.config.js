const config = {
  users: {
    sorting: {
      fields: {
        format: String,
        default: 'role email',
        env: 'USERS_DEFAULT_SORTING_FIELDS',
      },
    },
    pagination: {
      startPage: {
        format: 'nat',
        default: 1,
        env: 'USERS_DEFAULT_PAGINATION_START_PAGE',
      },
      perPage: {
        format: 'nat',
        default: 10,
        env: 'USERS_DEFAULT_PAGINATION_PER_PAGE',
      },
    },
  },
}

module.exports = config
