import { Connection, createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
  port: number;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "localhost"; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  newOptions.port = 5434;
  createConnection({
    ...options,
  });
});

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "rentx_test" ? "" : defaultOptions.database,
    })
  );
};
