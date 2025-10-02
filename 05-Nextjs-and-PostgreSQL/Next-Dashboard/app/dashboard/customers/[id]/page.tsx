export default async function CustomerByIdPage({
        params
    }: {
        params: Promise<{id: number}>
    }){
    const {id} = await params;
    return <h2>Customer Id: {id}</h2>
}