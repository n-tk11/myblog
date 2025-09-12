

export async function signCookie(value: string, secret: string) {
    //sign with hmac sha256
    const crypto = await import('crypto');
    return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export async function verifyCookie(value: string, signature: string, secret: string) {
    const expectedSignature = await signCookie(value, secret);
    return expectedSignature === signature;
}