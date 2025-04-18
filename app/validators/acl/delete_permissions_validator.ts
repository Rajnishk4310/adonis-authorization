import { permissions } from '#database/seeders/2_permission_seeder'
import { arrayExists } from '#validators/rules/array_exists'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

function permissionsProtector(value: unknown, _: unknown, field: FieldContext) {
  if (Array.isArray(value) && value.some((elem) => permissions.includes(elem)))
    field.report('Some of the permissions cannot be deleted', 'permissions', field)
}

export const deletePermissionsValidator = vine.compile(
  vine.object({
    permissions: vine
      .array(vine.string())
      .distinct()
      .notEmpty()
      .use(arrayExists({ table: 'permissions', column: 'slug' }))
      .use(vine.createRule(permissionsProtector)()),
  })
)
