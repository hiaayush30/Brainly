const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value) throw new Error(`Missing environment variable: ${key}`);
    return value;
};

//helps fix the TS problem of 'value can be string or undefined and only string accepted' 

export const PORT = getEnv("PORT", "3000"); // Default port is 3000
export const MONGO_URI = getEnv("MONGO_URI");
export const FE_DOMAIN = getEnv("FE_DOMAIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
