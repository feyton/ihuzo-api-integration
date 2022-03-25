####  ihuzo-api-integration
[![Auto Deploy](https://github.com/feyton/ihuzo-api-integration/actions/workflows/heroku_deploy.yml/badge.svg)](https://github.com/feyton/ihuzo-api-integration/actions/workflows/heroku_deploy.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/6c925c72736a75f528b2/maintainability)](https://codeclimate.com/github/feyton/ihuzo-api-integration/maintainability) ![GitHub followers](https://img.shields.io/github/followers/feyton?style=social)
## Description
Integrating Flutterwave payment API into a node application. This project is demo which is a part of Freelancers training offered by **IHUZO** to different developers in **Rwanda** in Payment API integration

## Technologies used
- Node.js (Backend)
- EJS (Templating Engine)
- Vanilla JS, HTML, CSS (Frontend)

## Testing and Usage
For demonstration purpose. This project is hosted on heroku.
Please use the link below to access the project:
**[Project Heroku Link](https://ihuzo-api-fabrice.herokuapp.com)**
**Note:** The project run with Testing API KEY, all payments made will not be processed and be sure to use `123456` as the **`OTP KEY`** where you will be asked for that key.

## Setting Up development server on local machine.
Assuming you are using Node.js already:
Use the following commands in order and be sure to check comments
```
git clone https://github.com/feyton/ihuzo-api-integration.git
cd ihuzo-api-integration
npm install
touch .env // the content to be filled in are in the description
npm run dev // this command will run in watch mode. Use npm start in production
// open browse and go to http://localhost:3000  // replace <3000> with the PORT you will use
```
## Features
- Full error handling
- Transaction success confirmation
- Oprional redirection
- Aesthethic UI
- Full GITHUB Action Integration
## Pre-requisite
For successfully local testing and development. You will need a `.env` file with the following info:
```
PORT=3000
API_PUBLIC=<flutterwave public api>
API_SECRET=<flutterwave secret key>
```
To find these key, assuming you already have **[Flutterwave account](https://flutterwave.com/rw/)**. 
- Open your **Dashboard**
- Got to the **[API Page](https://dashboard.flutterwave.com/dashboard/settings/apis)**
- Copy the key and fill them in the above file

## Contribution
Ohh, if you spot some issues and areas of improvement
- You can open a PR 
- Create a new issue and I will reach to you as soon as possible

## Acknowledgements

I wanted to give credits to the people who inspired through the trainings especially my Trainers. if you don't find your name here, it is not that I don't care. It happens sometimes
- Consolatrice
- Taufique
- Fiston

And the best of all goes to 
- **[IHUZO](https://ictchamber.rw/ihuzo/)**
- **[K-LAB](https://klab.rw/)**

## Links
Use these links for usefull information
- **[K-LAB Freelancers Platform](https://klabfreelancers.rw/)**

