// tests/api.spec.ts
import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';
import { StatusCodes } from 'http-status-codes'

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

    test('find user: should return a user by ID', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(StatusCodes.CREATED);

        const newUser = await createUser.json();
        console.log(newUser);

        const searchUser = await request.get(`${baseURL}/${newUser.id}`);
        const foundUser = await searchUser.json();

        //to confirm correct user is found
        expect(foundUser).toEqual(newUser)
        expect(searchUser.status()).toBe(StatusCodes.OK);

        await cleanupUsers(request);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        const newUser = await createUser.json();
        console.log(newUser);

        const searchUser = await request.get(`${baseURL}/${newUser.id+1}`);
        expect(searchUser.status()).toBe(StatusCodes.NOT_FOUND);

        await cleanupUsers(request);
    });

    test('create user: should add a new user', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(StatusCodes.CREATED);

        const newUser = await createUser.json();
        console.log(newUser);

        await cleanupUsers(request);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        expect(createUser.status()).toBe(StatusCodes.CREATED);

        const newUser = await createUser.json();

        const searchUser = await request.delete(`${baseURL}/${newUser.id}`);
        expect(searchUser.status()).toBe(StatusCodes.OK);

        console.log(`Removed user with next ID: ${newUser.id}`)
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const createUser = await request.post(`${baseURL}`);
        const newUser = await createUser.json();

        const searchUser = await request.delete(`${baseURL}/${newUser.id+1}`);
        expect(searchUser.status()).toBe(StatusCodes.NOT_FOUND);

        await cleanupUsers(request);
    });

});
