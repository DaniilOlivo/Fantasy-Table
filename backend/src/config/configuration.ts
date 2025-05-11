declare const process: {
    env: {
        DATABASE_URI: string;
        JWT_SECRET: string;
    }
}

export default () => {
    const uri = process.env.DATABASE_URI;
    if (!uri) throw new Error('Uri database is missing');

    let secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT secret is missing');

    console.log(uri);
    return {
        database_uri: uri,
        jwt_secret: secret,
        bcrypt: {
            rounds: 10,
        },
    }
}
