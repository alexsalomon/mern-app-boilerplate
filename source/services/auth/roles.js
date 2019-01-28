/**
 * A list of all roles used in the application and their resource permissions.
 * Roles can extend permissions from other roles, inheriting all their permissions.
 */
const roles = {
  admin: {
    extends: 'user',
    permissions: ['user:*'],
  },
  user: {
    extends: 'guest',
    permissions: ['account:*'],
  },
  guest: {
    permissions: ['status:*', 'authentication:*'],
  },
}

/**
 * Removes the role hierarchy implementation by recursively concatenating all the child
 * permissions from each role.
 * @param {object} hierarchicalRoles The hierarchical roles object.
 * @returns {object} The flattened role object (without hierarchy).
 */
function getFlattenedRoles(hierarchicalRoles) {
  const flattenedRoles = {}
  for (const roleName of Object.keys(hierarchicalRoles)) {
    flattenedRoles[roleName] = {}
    flattenedRoles[roleName].permissions = getRolePermissions(hierarchicalRoles[roleName])
  }
  return flattenedRoles
}

function getRolePermissions(role) {
  let permissions = role.permissions
  if (role.extends) {
    const childPermissions = getRolePermissions(roles[role.extends])
    permissions = [...permissions, ...childPermissions]
  }
  return permissions
}


module.exports = getFlattenedRoles(roles)
