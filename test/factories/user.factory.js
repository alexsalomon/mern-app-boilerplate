module.exports = {
  validLoggedUsers() {
    return [{
      firstName: 'Timon',
      lastName: 'Lenon',
      email: 'user1@user.com',
      password: 'user1password',
      role: 'user',
    },
    {
      firstName: 'Pumbaa',
      lastName: 'Lenon',
      email: 'user2@user.com',
      password: 'user2password',
      role: 'user',
    },
    {
      firstName: 'Zazu',
      lastName: 'Lenon',
      email: 'user3@user.com',
      password: 'user3password',
      role: 'user',
    }]
  },

  validAdminUsers() {
    return [{
      firstName: 'Musafa',
      lastName: 'Misk',
      email: 'admin1@admin.com',
      password: 'admin1password',
      role: 'admin',
    },
    {
      firstName: 'Simba',
      lastName: 'Misk',
      email: 'admin2@admin.com',
      password: 'admin2password',
      role: 'admin',
    },
    {
      firstName: 'Nala',
      lastName: 'Misk',
      email: 'admin3@admin.com',
      password: 'admin3password',
      role: 'admin',
    }]
  },
}
