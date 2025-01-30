import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 5);
}

export const comparePassword = (password: string, encrypted: string): boolean => {
    return bcrypt.compareSync(password, encrypted);
}