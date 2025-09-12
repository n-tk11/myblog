import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        // Delete the session cookie
        cookies.delete('session', { path: '/' });
        
        // Redirect to login page
        throw redirect(303, '/login');
    }
};
