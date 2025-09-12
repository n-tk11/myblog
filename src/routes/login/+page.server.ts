
import { signCookie } from '$lib/auth/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        //tempory login
        if (formData.get('username') === 'admin' && formData.get('password') === 'password') {
            const token = await signCookie('admin', 'secret');
            cookies.set('session', token, { path: '/' });
            return redirect(303, '/admin');
        }
        return { success: false };
    }
}