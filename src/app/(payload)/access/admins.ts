import type { AccessArgs } from 'payload'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(['admin'], user!)
}
