'use-strict'

const express = require('express');
const app = express();
const PORT = 8000;
const { Client } = require('pg')
const redis = require("redis")


//Set DB instances
const pgClient = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
const redisClient = redis.createClient({ host: process.env.REDIS_HOST });


//Get Api Home Message
app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
});

//Get DB status
app.get('/status', async (req, res) => {
    const query = 'SELECT date_trunc(\'second\', current_timestamp - pg_postmaster_start_time()) as uptime;';
    const result = await pgClient.query(query);
    const uptime = result.rows[0].uptime;
    const postgresUptime = function() {
        let time = '';

        time += uptime.hours ? `${uptime.hours}h ` : '';
        time += uptime.minutes ? `${uptime.minutes}m ` : '';
        time += uptime.seconds ? `${uptime.seconds}s` : '';

        return time;
    };

    res.json({
        status: 'ok',
        postgresUptime: postgresUptime(),
        redisConnectedClients: Number(redisClient.server_info.connected_clients)
    })
});

// Start express server 
app.listen(PORT,(error) =>{
    if(error){throw error; }

    pgClient.connect();
    console.log('----- Api Started ! ----- ');
    console.log(`express server listening on : ${PORT}`);
})