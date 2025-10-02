export async function DELETE(request: Request,
     {params}: {params: Promise<{id: number}>}){
    
    const {id} = await params
    console.log(`DELETE * FORM customer WHERE id = ${id}`);

    return new Response(null, { status: 204 });
}