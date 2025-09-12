
import { signCookie } from '$lib/auth/auth';
import { redirect } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';




export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        //tempory login
        if (formData.get('username') === '' || formData.get('password') === '' || formData.get('username') == null || formData.get('password') == null) {
            return { success: false, error: 'Username and password are required' };
        }
        if (formData.get('username') === 'admin' && formData.get('password') === ADMIN_PASSWORD) {
            const token = await signCookie('admin', 'secret');
            cookies.set('session', token, { path: '/' });
            return redirect(303, '/admin');
        } else {
            return { success: false, error: 'Invalid username or password' };
        }
        return { success: false };
    }
}