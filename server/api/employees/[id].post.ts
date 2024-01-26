import {serverSupabaseServiceRole, serverSupabaseUser} from '#supabase/server'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await serverSupabaseServiceRole(event)
    // @ts-ignore
    const id = parseInt(event.context.params.id) as number
    if (!Number.isInteger(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID should be an integer',
        })
    }
    const user = await serverSupabaseUser(event);
    // @ts-ignore
    body.MANAGER_ID = user.id;
    // @ts-ignore
    const {data,error} = await client.from('employees').update({
    COMMISSION_PCT:body.COMMISSION_PCT || null,
    DEPARTMENT_ID:body.DEPARTMENT_ID || null,
    EMAIL:body.EMAIL || null,
    FIRST_NAME:body.FIRST_NAME || null,
    HIRE_DATE:body.HIRE_DATE || null,
    JOB_ID:body.JOB_ID || null,
    LAST_NAME:body.LAST_NAME || null,
    PHONE_NUMBER:body.PHONE_NUMBER || null,
    SALARY:body.SALARY || 0,
    }).eq('EMPLOYEE_ID', id).select()
    return { data: data }
})