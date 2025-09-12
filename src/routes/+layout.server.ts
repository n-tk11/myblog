import { redirect } from '@sveltejs/kit';

export async function load(event) {
    return {
        user: event.locals.user ? event.locals.user : null
    };
}
