const prefix = (path) => {
    let prefix = null;
    switch (process.env.NODE_ENV) {
        // development uses tsc-watch now
        case "test":
            prefix = "src";
            break;
        case 'development':
        default:
            prefix = 'dist/src';
            break;
    }

    return `${prefix}/${path}`;
};

const config = {
    type: 'mysql',
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    synchronize: false,
    logging: false,
    entities: [prefix('{entity,domain,projection}/**/*.*')],
    migrations: [prefix('migration/**/*.*')],
    subscribers: [prefix('{subscriber,domain,projection}/**/*.*')],
    cli: {
        entitiesDir: prefix('{entity,domain,projection}'),
        migrationsDir: prefix('migration'),
        subscribersDir: prefix('{subscriber,domain,projection}'),
    },
    factories: [ prefix('database/factories/**/*{.ts,.js}') ],
    seeds: [ prefix('database/seeds/**/*{.ts,.js}') ]
};
module.exports = config;
