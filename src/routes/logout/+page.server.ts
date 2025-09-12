import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies, locals }) => {
        locals.user = undefined;
        
        cookies.delete('session', { path: '/' });
        
        throw redirect(303, '/login');
    }
};
