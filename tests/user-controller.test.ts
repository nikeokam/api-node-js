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
        console.log(`Removed: ${i+1} users`)
    }

    test('all users: should return empty array when no users', async ({ request }) => {
            await cleanupUsers(request);
            const responseAfterCleanup = await request.get(`${baseURL}`);
            const usersAfterCleanup = await responseAfterCleanup.json();
            expect(usersAfterCleanup.length).toBe(0);

    });

    test('find user: should return a user by ID', async ({ request }) => {

    });

    test('find user: should return 404 if user not found', async ({ request }) => {

    });

    test('create user: should add a new user', async ({ request }) => {

    });

    test('delete user: should delete a user by ID', async ({ request }) => {

    });

    test('delete user: should return 404 if user not found', async ({ request }) => {

    });


});
