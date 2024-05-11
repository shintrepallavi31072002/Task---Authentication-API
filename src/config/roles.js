const allRoles = {
  user: ['manageUser', 'getUsers'],
  admin: ['getUsers',],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
