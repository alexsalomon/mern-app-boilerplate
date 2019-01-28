/**
 * An extensive list of all roles used in the application and their resource permissions.
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
 * Removes the role hierarchy by adding child permissions to every extendable role.
 * @param {Object} hierarchicalRoles The hierarchical roles object.
 * @returns {Object} The flattened role object (without hierarchy).
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
