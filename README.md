<h1 align="center">
  SoftMakers-Contatos
</h1>

<p align="center">

  <a href="https://www.linkedin.com/in/augusto-vin%C3%ADcius-vasconcelos-tabosa-71aa991a5/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-adoidadox2-%23FF9000">
  </a>
</p>


## Technologies :rocket::

Technologies that I used to develop this MVC 

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Multer](https://github.com/expressjs/multer)
- [Helmet](https://helmetjs.github.io/)
- [EJS](https://ejs.co/)
- [Cors](https://github.com/expressjs/cors)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
 - [ShellJs](https://github.com/shelljs/shelljs)
 - [Rimraf](https://www.npmjs.com/package/rimraf)
 - [Fs-extra](https://www.npmjs.com/package/fs-extra)
 - [NPM-run-all](https://www.npmjs.com/package/npm-run-all)
 - [Bcrypt](https://www.npmjs.com/package/bcrypt)
 - [JWT](https://jwt.io/)


## Directories tree 

  
	├── src
	│   ├── config
	│   ├── controllers
	│   ├── database
	│   │   └── migrations
	│   ├── dtos
	│   ├── errors
	│   ├── middlewares
	│   ├── models
	│   ├── repositories
	│   ├── routes
	│   ├── server.ts
	│   ├── services
	│   ├── tools
	│   ├── @types
	│   ├── utils
	│   └── views
	├── uploads

### Inside the project  -
- **User**: Represents a contact
- **Admin**: Represents a user, who can create, update and delete contacts

### Environment variables -
- **NODE_ENV**: Defines the environment  (Ex.: development / production)
- **PORT**: Defines the port on which the application runs (Ex.: 3333)
-   **APP_SECRET**: Defines the secret of the application, which guarantees the uniqueness of the tokens (Ex.:asdybhq47qrdb)    
-  **APP_TTL**: Defines the time of validity of a token (Ex.: 1d) 
- **DB_TYPE**: Defines the type of database (Ex.: postgres)
- **DB_HOST**: Defines the host of database (Ex.: localhost)
- **DB_PORT**: Defines the port of database (Ex.: 5432)
- **DB_USERNAME**: Defines the username of database (Ex.: admin)
- **DB_PASSWORD**: Defines the password of database (Ex.: admin123)
- **DB_NAME**: Defines the name of database (Ex.: softmakers-contatos)


## Getting started :desktop_computer::


### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/adoidadox2/SoftMakers-Contatos.git && cd SoftMakers-Contatos
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name softmakers-contatos-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=softmakers-contatos -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d -t postgres

# Once the services are running, run the migrations
$ yarn typeorm migration:run

```
To start the server in a **development** environment: 

    $ yarn dev:server

To start the server in a **production** environment (remember to put "production" at NODE_ENV): 

    #To transpile from Typescript to Javascript
    $ yarn build
    
    #To run the server already transpiled
	$ yarn start

### Comments -
- All ID's are uuid
	- Handled errors return their `HTTP status` and a specific error message. ** Ex ** .: `{"status": "error", "message":" User not found "}`
- Unexpected errors are treated as `status 500 - Internal Server Error`


## Routes

Views -

	#Create new admin
	/admin
	
	#Login
	/session

	#List all contacts, ( accepts pagination - 10 contacts per page Ex.: /user?page=1 )
	/user

	#Create new contact
	/user/new
	
	#Contact details
	/user/:id

	#Edit contact
	/user/:id/edit
	
Without view -
		
		
	#DELETE HTTP method
    /user/:id

## Challenges for me & Strategies to a scalable application   :chart_with_upwards_trend::

 - First time creating MVC, as well as my first time dealing with HTML, I can say that I learned a lot in less than a week
 - I've never used template engines before, I think it was a good experience, especially due to typescript, because I found some incredible packages (like ShellJs) needed to dynamically copy view's folder to the transpiled directory
 - I believe that for a more scalable application, a functionality for creating and authenticating users of the system must be implemented, as well as preventing large flows of requests / DDoS and add sentry to monitor the application in production
 - List users by address, using the **address 1 - N user** relation


## License :memo::

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author :man_technologist::

Made with :heart: by **Augusto Vinícius** 👋🏻 [Get in touch!](https://github.com/adoidadox2)
