import { Access } from 'payload/types'

import { checkRole } from '../../Users/checkRole'

export const adminsOrOrderedBy: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      orderedBy: {
        equals: user?.id,
      },
    }
  }
  return false
}
