# appsync-pg-hello
Serverless AppSync Lambda resolver for PostgreSQL.

```
# node test.js

Received event {
   "sql": "SELECT * FROM hello LIMIT 10"
}
Executing SQL: SELECT * FROM hello LIMIT 10
[ { id: 1, content: 'Hello Postgres!' },
  { id: 2, content: 'Hello again!' } ]

--- RESULT ---

 [ { id: 1, content: 'Hello Postgres!' },
  { id: 2, content: 'Hello again!' } ]

--------------

Received event {
   "sql": "SELECT * FROM hello WHERE id = :ID",
   "variableMapping": {
      ":ID": 1
   }
}
Executing SQL: { text: 'SELECT * FROM hello WHERE id = $1', values: [ 1 ] }
[ { id: 1, content: 'Hello Postgres!' } ]

--- RESULT ---

 [ { id: 1, content: 'Hello Postgres!' } ]
 ```