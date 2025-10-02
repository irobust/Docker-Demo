"use client"
import { CustomerField } from '@/app/lib/definitions';
import useSWR from 'swr';

const fetcher = (url: URL) => fetch(url).then(resp => resp.json());

export default function CustomerPage(){
    const {data, error} = useSWR(process.env.NEXT_PUBLIC_BASE_API + "/customers", fetcher)

    if(error) return <div>Fail to load customer API</div>;
    if(!data) return <div>Loading customers....</div>

    console.log(process.env.NEXT_PUBLIC_BASE_API);

    return (
        <>
            <h2>List of Customers</h2>
            <ul>
                { data.map((customer: CustomerField) => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
        </>
    )
}