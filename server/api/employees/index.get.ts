
import { serverSupabaseServiceRole } from '#supabase/server'
export default eventHandler(async (event) => {

    const query = getQuery(event)
    const client = await serverSupabaseServiceRole(event)

    const clientParser = client.from('employees').select();
    if(query.FIRST_NAME){
        clientParser.like('FIRST_NAME', '%'+ query.FIRST_NAME +'%')
    }


    if(query.sortName && query.sortOrder){
        // @ts-ignore
        clientParser.order(query.sortName, { ascending: query.sortOrder == 'asc' })
    }else{
        clientParser.order('EMPLOYEE_ID', { ascending: false })
    }

    const {data} = await clientParser

    return { data: data }
})


