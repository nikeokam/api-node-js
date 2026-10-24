import {test, expect} from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';
import {cleanupUsers} from "../src/helpers/api-helper";




test('all users: should return empty array when no users', async ({ request }) => {
    await cleanupUsers(request);
    const responseAfterCleanup = await request.get(`${baseURL}`);
    const usersAfterCleanup = await responseAfterCleanup.json();
    expect(usersAfterCleanup.length).toBe(0);

});