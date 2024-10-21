import { User } from '../../payload-types'

export const checkRole = (rolesToCheck: User['roles'], user?: User): boolean => {
  if (user) {
    if (
      rolesToCheck?.some((roleToCheck) => {
        return user.roles?.some((userRole) => {
          return roleToCheck === userRole
        })
      })
    )
      return true
  }
  return false
}
