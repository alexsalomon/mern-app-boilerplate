/**
 * TESTING: Default user information to facilitate user creation during tests.
 */

module.exports = {
  validLoggedUsers() {
    return [
      {
        firstName: 'Timon',
        lastName: 'Lenon',
        email: 'user5@user.com',
        password: 'user5password',
        role: 'user',
      },
      {
        firstName: 'Pumbaa',
        lastName: 'Lenon',
        email: 'user3@user.com',
        password: 'user3password',
        role: 'user',
      },
      {
        firstName: 'Zazu',
        lastName: 'Lenon',
        email: 'user1@user.com',
        password: 'user1password',
        role: 'user',
      },
      {
        firstName: 'First2',
        lastName: 'Last2',
        email: 'user2@user.com',
        password: 'user2password',
        role: 'user',
      },
      {
        firstName: 'First4',
        lastName: 'Last4',
        email: 'user4@user.com',
        password: 'user4password',
        role: 'user',
      },
      {
        firstName: 'First6',
        lastName: 'Last6',
        email: 'user6@user.com',
        password: 'user7password',
        role: 'user',
      },
      {
        firstName: 'First7',
        lastName: 'Last7',
        email: 'user7@user.com',
        password: 'user7password',
        role: 'user',
      },
      {
        firstName: 'First8',
        lastName: 'Last8',
        email: 'user8@user.com',
        password: 'user8password',
        role: 'user',
      },
      {
        firstName: 'First9',
        lastName: 'Last9',
        email: 'user9@user.com',
        password: 'user9password',
        role: 'user',
      },
      {
        firstName: 'First10',
        lastName: 'Last10',
        email: 'user10@user.com',
        password: 'user10password',
        role: 'user',
      },
    ]
  },

  validAdminUsers() {
    return [
      {
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
      },
    ]
  },
}
