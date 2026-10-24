import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';


const cleanupUsers = async ( request: any): Promise<void> => {
    const response = await request.get(`${baseURL}`);
    const users: Array<any> = await response.json();

    let i = 0;
    for ( i; i < users.length; i++) {
        await request.delete(`${baseURL}/${users[i].id}`)
    }
    console.log(`Removed: ${i} users`)
}

test('all users: should return empty array when no users', async ({ request }) => {
    await cleanupUsers(request);
    const responseAfterCleanup = await request.get(`${baseURL}`);
    const usersAfterCleanup = await responseAfterCleanup.json();
    expect(usersAfterCleanup.length).toBe(0);

});