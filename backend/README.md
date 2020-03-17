# Backend Server

## Setup

```bash
    npm install
    
    mysql (?)
```

## Usage

```bash
    npm start
```
OR
```bash
    npm run watch
```
THEN
```bash
    Backend Server is running on '5000' port
```

## Routes

* /
* /me
* /session
  * /session/login/:type
  * /session/logout
* /citizens
  * /citizens/all
  * /citizens/:TCKno
* /data
  * /data/new
  * /data/modify
  * /data/:uuid
  * /data/:uuid/:id
#
#### Debug Routes
* /sample
  * /sample/user/:count
  * /sample/data/:count

## Modules

* Express (+)
* Passport (+)
* MySQL (+)
* Schm (+)
* Babel (+)
