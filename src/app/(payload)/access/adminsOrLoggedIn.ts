import type { Access, AccessArgs } from 'payload/types'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

export const adminsOrLoggedIn: Access = ({ req }: AccessArgs<User>) => {
  if (checkRole(['admin'], req.user!)) {
    return true
  }

  return !!req.user
}
