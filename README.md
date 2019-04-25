![Build Status](https://travis-ci.org/Meepit/goldsrc-tracker.svg?branch=master)
# Goldsrc-Tracker

Tracks player counts on various goldsrc games / mods on steam and allows the setting of custom alerts when specified player thresholds are met.

## Configuration 
The majority of environment variables have defaults, these can be changed if required by setting the following environment variables.

| Name         | Desc                     | Default   |
|--------------|--------------------------|-----------|
|REDIS_HOST    | Redis host               | 127.0.0.1 |
|REDIS_PORT    | Redis port               | 6379      |  
|SESSION_SECRET| Express sessions secret  | changeme  |
|STEAM_API_KEY | Your steam API key       |           |
|DB_USER       | Postgres username        | postgres  |
|DB_NAME       | Postgres database name   | postgres  |
|DB_HOST       | Postgres database host   | 127.0.0.1 |

## Usage

1. Start dependencies (redis, postgres)
```
docker-compose up -d
```

2. Install packages
```
npm install
``` 
3. Export Steam API key which can be generated at `https://steamcommunity.com/dev/apikey`
```
export STEAM_API_KEY={key}
```
4. Start server
```
npm start
```

## Testing

```
npm test
```
