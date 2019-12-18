
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var fs = require('fs');

// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: 'EDPAlek', // update me
            password: 'edp@ele800' // update me
        },
        type: 'default'
    },
    server: 'dotnetappsqldb20190406050921dbserver.database.windows.net', // update me
    options:
    {
        database: 'DotNetAppSqlDb20190406050921_db', //update me
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase()
        }
    }
);

function queryDatabase()
{
    //console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT DeviceID, Power, Time FROM(SELECT TOP(1) DeviceID, Power, Time FROM dbo.infoTable2 WHERE DeviceID = 'CS1' ORDER BY Time DESC) AS a UNION ALL SELECT DeviceID, Power, Time FROM(SELECT TOP(1) DeviceID, Power, Time FROM dbo.infoTable2 WHERE DeviceID = 'CS2' ORDER BY Time DESC) AS b UNION ALL SELECT DeviceID, Power, Time FROM(SELECT TOP(1) DeviceID, Power, Time FROM dbo.infoTable2 WHERE DeviceID = 'CS3' ORDER BY Time DESC) AS c;",
        function(err, rowCount, rows)
        {
            //console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        
        fs.writeFileSync("input.json", JSON.stringify(columns))
        columns.forEach(function(column) {
            //console.log("%s\t%s", column.metadata.colName, column.value);
        });
         
    });
    connection.execSql(request);
}