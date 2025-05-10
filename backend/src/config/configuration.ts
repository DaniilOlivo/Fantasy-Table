declare const process: {
    env: {
        DATABASE_URI: string;
    }
}

export default () => {
    const uri = process.env.DATABASE_URI;
    if (!uri) throw new Error('Uri database is missing');
    console.log(uri);
    return {
        database_uri: uri,
    }
}
