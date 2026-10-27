// tests/api.spec.ts
import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';
import { StatusCodes } from 'http-status-codes'
import {cleanupUsers} from "../src/helpers/api-helper";

test.describe('User management API', () => {



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

        let fakeID = 101;

        const searchUser = await request.get(`${baseURL}/${fakeID}`);
        expect(searchUser.status()).toBe(StatusCodes.NOT_FOUND);

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
        let fakeID = 101;

        const searchUser = await request.delete(`${baseURL}/${fakeID}`);
        expect(searchUser.status()).toBe(StatusCodes.NOT_FOUND);
    });

});
