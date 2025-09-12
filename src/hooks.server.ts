
import type { Handle } from '@sveltejs/kit';

import { verifyCookie } from '$lib/auth/auth';

// Extend App.Locals to include 'user'
declare global {
    namespace App {
        interface Locals {
            user?: { name: string };
        }
    }
}

export const handle: Handle = async ({ event, resolve }) => {
    if (event.route.id?.startsWith('/admin')) {
        const token = event.cookies.get('session');
        if (token) {
            const isValid = await verifyCookie(token, "admin", 'secret');
            if (isValid) {
                event.locals.user = { name: 'admin' };
            } 
        } 
    }
    
    return await resolve(event);
};