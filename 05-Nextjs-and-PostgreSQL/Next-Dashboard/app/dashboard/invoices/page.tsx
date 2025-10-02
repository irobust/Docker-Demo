export default async function InvoicesPage(){
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return <h2>Invoice Page</h2>
}