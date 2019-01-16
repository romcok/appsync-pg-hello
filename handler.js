const { Client } = require('pg');

function executeSQL(client, sql) {
  console.log('Executing SQL:', sql);
  return new Promise((resolve,reject) => {
    
    client.query(sql, (err, res) => {
      console.log(err ? err.stack : res.rows); // Hello World!
      let result = err ? err.stack : res.rows;
      if(err) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

function populateAndSanitizeSQL(sql, variableMapping) {
  var i = 0;
  var values = [];
  if(variableMapping) {
    Object.entries(variableMapping).forEach(([key, value]) => {
      i++;
      sql = sql.replace(key, "$" + i);
      values.push(value);
    });
  }

  return i > 0 ?
    {
      text: sql,
      values: values }
    : sql;
}

exports.graphqlHandler = async (event) => {
  
  if(!process.env.PG) {
    throw new Exception("No connection string! (process.env.PG)");
  }

  const client = new Client(process.env.PG);

  client.connect();

  console.log('Received event', JSON.stringify(event, null, 3));

  const inputSQL = populateAndSanitizeSQL(event.sql, event.variableMapping);
  let result = await executeSQL(client, inputSQL);

  if (event.responseSQL) {
    const responseSQL =
      populateAndSanitizeSQL(event.responseSQL, event.variableMapping);
    result = await executeSQL(client, responseSQL);
  }
  //console.log(JSON.stringify(result, null, 3));
  client.end();
  return result;
};