import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const client = await serverSupabaseServiceRole(event)

    // @ts-ignore
    const id = parseInt(event.context.params.id) as number

    if (!Number.isInteger(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID should be an integer',
        })
    }
    const {data} = await client.from('employees').select('*').eq('EMPLOYEE_ID',id).single()
    return { employees: data }
})