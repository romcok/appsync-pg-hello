const yaml = require('js-yaml');
const fs   = require('fs');
const handler = require("./handler.js");

process.env.PG = yaml.safeLoad(fs.readFileSync("./env.yml", "utf8")).pg;

/*process.env["PGHOST"] = env.pg.host;
process.env["PGUSER"] = env.pg.user;
process.env["PGPASSWORD"] = env.pg.password;
process.env["PGDATABASE"] = env.pg.database;
process.env["PGPORT"] = env.pg.port;*/

async function main() {
  let result = await handler.graphqlHandler({
    sql: "SELECT * FROM hello LIMIT 10"
  });
  
  console.log(
    "\n--- RESULT ---\n\n", 
    result,
    "\n");

  console.log("--------------\n");

  result = await handler.graphqlHandler({
    sql: "SELECT * FROM hello WHERE id = :ID", 
    variableMapping: {
      ":ID": 1
    }
  });

  console.log(
    "\n--- RESULT ---\n\n",
    result,
    "\n");
}

main()