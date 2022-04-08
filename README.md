## AWS RDS Nodejs API

# **A NodeJS project of API**

## **Project Requirement**

A simple RESTful Web API with Node/Express uses AWS-RDS Postgres, AWS-Fargate  

```json
{
    "id": 1,
    "original_url": "http://hibersoft.com",
    "shortened_url": "http://shorten.io/xXYlIKN7c",
    "createdAt": "2022-03-30T10:18:17.982Z",
    "updatedAt": "2022-03-30T10:18:17.982Z"
}
```

The API implements the following routes,

```text
GET /urlshortList

to return a list of all the urlshort.
```

```text
GET /urlshort/{id}

to only return the urlshort with `id`={id}
```

```text
POST /urlshort

to create a new urlshort.
```

```text
PUT /urlshort

to update existing urlshort
```


```
DELETE /urlshort/{id}

to delete existing urlshort
```


<br>

## **Project Setup Guide**

---

<br>

### **NodeJS Installation**

Download and install Node.js from https://nodejs.org

<br>
<br>

### **Project Repo**

 https://github.com/cssam/aws-rds-node-api  
<br>

## **Code Description**

---

<br>

### **Development IDE**

This project uses VSCODE with follwoing libraries.
This project uses EditorConfig to standardize test editor configuration. Visit https://editorconfig.org for details.

This project uses ESLint to detect suspicious code in Javascript files. Visit https://eslint.org for details.

<br>

### **Project Configuration**

Configurations of the project implemented in `config` folder.

App configurations defined in `config.js`. It reads values from `.env` files.

`development.env` defines development phase configurations and uses as

```
const dotenv = require("dotenv");
```


#### **Database**

Project database created in AWS RDS.
![rds-database-instance](https://user-images.githubusercontent.com/6191308/161145240-7a19fd98-2f5e-43f8-923f-b18f43608d8d.png)

To Manage the database from local machine, added following to the Security Group Inbound Rules

![Security Group Inbound](https://user-images.githubusercontent.com/6191308/161146161-97b031de-9ca7-4c1a-b186-601c55c75f7f.png)

PGAdmin
![pgAdmin](https://user-images.githubusercontent.com/6191308/161147653-4f1eecd1-0008-4f17-a302-8de364701503.png)


### **Project Setup**

Run

```
npm init
npm install body-parser, cors, dotenv, express, jsonwebtoken, method-override, pg, pg-hstore, sequelize, shortid, valid-url
```

Package.json
![Package json](https://user-images.githubusercontent.com/6191308/161906482-43b38068-afcf-45a3-8d7e-efa340262363.png)

<br>
<br>

### **App Security**

<br>

#### **Incoming call security**

<br>

This project uses JWT to detect incoming api calls authority. Visit https://jwt.io/ for details.
`jsonwebtoken` library uses in app security controller `auth.controller.js`.

```
const jwt = require("jsonwebtoken");
```

When user get registered to the app, it will return JWT token back.

This token need to send in all other api calls to the app. There are two ways app can verify incoming token.  
The simple way is passing as a header parameter; `const token = req.headers["x-access-token"];` and it will be verified in

```
jwt.verify(token, config.jwt_secret, (err, decoded) => {
```

In this app we are using different approach.**`Passport`**! It descibes in below.

#### **User verification**

This project uses `Passport` library for user verification and session management. Visit http://www.passportjs.org/ for details. In app routes such as `auth.route.js` and `note.route.js` uses the library.

```
const passport = require("passport");

```

There are hundereds of stratergys implemented with `Passport`.  
Using `passport`, `passport-jwt`, `passport-local` libraries app implemented with `local` and `jwt` stratergies in ` lib\passport\index.js`.

```
passport.use(new LocalStrategy(
```

and

```
passport.use(new JWTStrategy(
```

In addition to above, following libraries are uses to help app security as well.  
`bcryptjs`, `cookie-parser`, `crypto`  
<br>

### **CORS**

This app confiured for CORS using `cors` library.
Later we can allocate trusted urls in `ALLOW_LIST`.

### **Routes**

Routes of the app are implemented in `auth,route.js` and `urlshort.route.js`

<!--```
router.post("/register", auth_controller.register);

router.post("/login", auth_controller.login);
```

```
router.get("/urlshort/:userid", passport.authenticate("jwt", { session: false }), urlshort_controller.getUrlshortList);

router.get("/urlshort/:id", passport.authenticate("jwt", { session: false }), urlshort_controller.getUrlshort);

router.post("/urlshort", passport.authenticate("jwt", { session: false }), urlshort_controller.createUrlshort);

router.put("/urlshort/:id", urlshort_controller.updateUrlshort);

router.delete("/urlshort/:id",  urlshort_controller.deleteUrlshort);

```
-->
```
router.get("/urlshort/", urlshort_controller.getUrlshortList);

router.get("/urlshort/:id",  urlshort_controller.getUrlshort);

router.post("/urlshort", urlshort_controller.createUrlshort);

router.put("/urlshort/:id", urlshort_controller.updateUrlshort);

router.delete("/urlshort/:id",  urlshort_controller.deleteUrlshort);

```
<br>
<br>

#### **Controllers**

There are controllers implemented in `controller` folder of the project; `auth.controller.js` and `nurlshort.controller.js`.

<!--
In `auth.controller` many functions implemented related to app security and user session management. Such as `register`, `login`, `verifyToken`, `getToken`, `currentUser`, and `logout`.
-->

In `urlshort.controller`; functions implemented to facilitated list, create, and get notes respectively `getUrlshortList`, `createUrlshort`,and `getUrlshort`.  
In both controller `express-validator` has used to verify `request` data and handles error returns.

#### **Models and Schemas**

In the `models` folder, `user` and `Urlshort` models have implemented.  
This app uses `sequalize` Object Data Modeling library to define Documents of the app. Visit https://sequelize.org/ for details.

There are many functions implemented for user management in the `services` folder `user.service.js`.


### **Testing**

Here are screenshots of `Postman` testing for the project.
<!--
![user_register](https://user-images.githubusercontent.com/6191308/141512900-d3aba10c-1949-41f8-ab9a-135a7e6e51e4.png)

![user_login](https://user-images.githubusercontent.com/6191308/141512910-09bf6b36-6a04-49db-a956-709dd2e0f11c.png)
-->
Get All - localhost
![Test - Get All](https://user-images.githubusercontent.com/6191308/161903909-46738be4-f5d3-401b-abf1-3d2ec48679d1.png)

Create - localhost
![Test - Create](https://user-images.githubusercontent.com/6191308/161903985-cf4b50b0-a746-4a68-a6d8-1a5d07986fdf.png)

Update - localhost
![Test - update](https://user-images.githubusercontent.com/6191308/161903146-66f1ca75-9d1f-4d3f-a437-7bb9faefc9fb.png)

Delete - localhost
![Test - Delete](https://user-images.githubusercontent.com/6191308/161903232-bcafc306-0549-4ffd-b539-61d2cbcf9e7c.png)


## **Deployment - Production**
App is deployed and configured in `AWS ECS Fargate` cloud server. 

AWS ECS Task Definition
![Task Definition](https://user-images.githubusercontent.com/6191308/161904673-d57092ff-2a3d-4b29-a5ea-704b87310eb1.png)

AWS ECS Task
![Task](https://user-images.githubusercontent.com/6191308/161904775-c8dc94f0-4be2-465c-9bb7-4bcdcfa00d17.png)

AWS Fargate Service and Application Load Balancer Configuration
https://github.com/cssamLabs/AWS-ALB-Fargate/blob/main/README.md 



`Postman`.
Get All - prod
![Fargate - Get All](https://user-images.githubusercontent.com/6191308/161905930-1b1fe40d-d3ef-4930-b191-7259400995bb.png)




