import { createConnection, getConnectionOptions } from "typeorm";

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
