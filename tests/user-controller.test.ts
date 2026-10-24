// tests/api.spec.ts
import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

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

    test('find user: should return a user by ID', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(201);

        const newUser = await createUser.json();
        console.log(newUser);

        const searchUser = await request.get(`${baseURL}/${newUser.id}`);
        const foundUser = await searchUser.json();

        //to confirm correct user is found
        expect(foundUser).toEqual(newUser)
        expect(searchUser.status()).toBe(200);

        await cleanupUsers(request);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        const newUser = await createUser.json();
        console.log(newUser);

        const searchUser = await request.get(`${baseURL}/${newUser.id+1}`);
        expect(searchUser.status()).toBe(404);

        await cleanupUsers(request);
    });

    test('create user: should add a new user', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(201);

        const newUser = await createUser.json();
        console.log(newUser);

        await cleanupUsers(request);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(201);

        const newUser = await createUser.json();

        const searchUser = await request.delete(`${baseURL}/${newUser.id}`);
        expect(searchUser.status()).toBe(200);

        console.log(`Removed user with next ID: ${newUser.id}`)
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        const newUser = await createUser.json();

        const searchUser = await request.delete(`${baseURL}/${newUser.id+1}`);
        expect(searchUser.status()).toBe(404);

        await cleanupUsers(request);
    });

});
