import crypto from 'crypto';

const idLength = 10;

export const generateIdx = () => {
    return crypto.randomBytes(Math.ceil(idLength / 2))
        .toString('hex')
        .slice(0, idLength);
}

