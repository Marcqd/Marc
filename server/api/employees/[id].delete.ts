import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
    const client = await serverSupabaseServiceRole(event)
    // @ts-ignore
    const id = parseInt(event.context.params.id) as number
    if (!Number.isInteger(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID should be an integer',
        })
    }
    const {error} = await client.from('employees').delete().eq('EMPLOYEE_ID', id)
    return { employees: error  }
})