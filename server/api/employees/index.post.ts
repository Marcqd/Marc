import {serverSupabaseServiceRole, serverSupabaseUser} from '#supabase/server'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await serverSupabaseServiceRole(event)
    const user = await serverSupabaseUser(event);
    // @ts-ignore
    body.MANAGER_ID = user.id;

    // @ts-ignore
    const {data} = await client.from('employees').insert({
        COMMISSION_PCT:body.COMMISSION_PCT || null,
        DEPARTMENT_ID:body.DEPARTMENT_ID || null,
        EMAIL:body.EMAIL || null,
        FIRST_NAME:body.FIRST_NAME || null,
        HIRE_DATE:body.HIRE_DATE || null,
        JOB_ID:body.JOB_ID || null,
        LAST_NAME:body.LAST_NAME || null,
        PHONE_NUMBER:body.PHONE_NUMBER || null,
        SALARY:body.SALARY || 0,
    }).select()
    return { data: data }
})