import { CustomerField } from "@/app/lib/definitions";

export default async function CustomersPage(){
    // const searchParams = useSearchParams();
    // const searchText = searchParams.get('q')

    const resp = await fetch("http://localhost:3000/api/customers");
    const customers:CustomerField[] = await resp.json();

    return (
        <>
            <h1>List of Customers</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
        </>
    )
}