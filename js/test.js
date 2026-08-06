import { supabase } from './supabase.js'

async function loadServices() {

    const { data, error } = await supabase
        .from('services')
        .select('*')

    if (error) {
        console.error(error)
        return
    }

    console.log(data)
}

loadServices()