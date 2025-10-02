import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function GET(request: NextRequest){
    const searchText = request.nextUrl.searchParams.get('q') || 'John';
    const apiVersion = request.headers.get('X-API-Version');

    const cookiesList = await cookies();
    const token = cookiesList.get('Token');

    const customers = [
        {id: 1, name: searchText},
        {id: 2, name: 'Jack'},
        {id: 3, name: 'Jenny'},
        {id: 4, name: 'Jimmy'},
        {id: 5, name: 'Timmy'}
    ];

    console.log(apiVersion, token)

    return new Response(JSON.stringify(customers), {
        headers: { 'Content-Type': 'application/json'},
        status: 200
    });
}

export async function POST(request: Request){
    const customer = await request.json()
    const {name, surname} = customer;

    const newUser = {
        id: 3,
        name: name,
        surname: surname,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    return new Response(JSON.stringify(newUser), {
        headers: { 'Content-Type': 'application/json'},
        status: 201
    })
}