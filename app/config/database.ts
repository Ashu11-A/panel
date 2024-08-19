import { Config, Configuration } from "@/controllers/configuration.ts";
import { DBDialect } from "@/controllers/database.ts";

/**
 * Database Configuration
 *
 * This configuration object holds all necessary settings for connecting to the database.
 */
export const DatabaseConf = {
    /**
     * The database dialect (sqlite | mysql).
     *
     * @type {Configuration}
     */
    db_dialect: new Configuration<DBDialect>({
        env: "DB_DIALECT",
        def: "sqlite3",
        chk(value, def) {
            if (["sqlite3", "mysql", "postgres", "mongo"].includes(value)) {
                return value as DBDialect;
            } else return def;
        },
        type: Config.String,
    }),

    /**
     * The username used for database authentication.
     *
     * @type {Configuration}
     */
    db_username: new Configuration({
        env: "DB_USERNAME",
        def: "root",
        type: Config.String,
    }),

    /**
     * The password used for database authentication.
     *
     * @type {Configuration}
     */
    db_password: new Configuration({
        env: "DB_PASSWORD",
        def: "password",
        type: Config.String,
    }),

    /**
     * The name of the database to connect to.
     *
     * @type {Configuration}
     */
    db_database: new Configuration({
        env: "DB_DATABASE",
        def: "my_database",
        type: Config.String,
    }),

    /**
     * The host address of the database server.
     *
     * @type {Configuration}
     */
    db_hostname: new Configuration({
        env: "DB_HOST",
        def: "localhost",
        type: Config.String,
    }),
};
