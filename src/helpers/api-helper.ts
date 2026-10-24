
let baseURL: string = 'http://localhost:3000/users';


export const cleanupUsers = async ( request: any): Promise<void> => {
    const response = await request.get(`${baseURL}`);
    const users: Array<any> = await response.json();

    let i = 0;
    for ( i; i < users.length; i++) {
        await request.delete(`${baseURL}/${users[i].id}`)
    }
    console.log(`Removed: ${i} users`)
}