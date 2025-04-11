export const extractSubFromToken = (token) => {
    if (!token) return null;

    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.sub;
}