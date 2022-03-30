
# UAS Lifecycle Management: Frontend Documentation
UAS Lifecycle Management Frontend is a Web Application project.

# Contents

- [Set Up Instructions](#Set Up)
- [How to run the project](#How to run the project)
- [Libraries and Tools Used](#Libraries and Tools Used)
- [Testing](#Testing)
- [Deployment](#Deployment)
# Set Up
Before running the project, please make sure you have the following installed on your machine:

- IntelliJ
- Node v14.17.3
- Npm v8.5.4
- Java 11
- MySQL Workbench and/or MySQL Client


## IntelliJ
IntelliJ is used to modify the code base, start, or run tests via terminal. 
IntelliJ can be downloaded [here](https://www.jetbrains.com/idea/download/#section=windows) where you can also find the set up instructions. 

## JavaScript

JavaScript is one of the most widely used programming languages. It is the language that
was used to develop the frontend of the UAS Lifecycle Management because React is JavaScript library.
## React
[React Documentation](https://reactjs.org/docs/getting-started.html)

React (Runs on Node.js) was used for the frontend of the UAS Lifecycle Management system.

## Npm (Package Manager tool for Node.js)
[npm documentation](https://docs.npmjs.com/)

Npm is the default package manager for the JavaScript runtime environment Node.js. It was
used as a command-line utility for interacting with said repository that aids in package
installation, version management, and dependency management. In addition, it was used to
build and start the project.

## Material UI 
[Material UI Documentation](https://mui.com/)

Material-UI is a components library which used as User Interface for React in UAS Lifecycle Management System.

---

# How to run the project

The project was build/start/run/compile successfully using:

- Node 14.17.3
- npm 8.5.4

To start/run/compile the project please follow the steps below:

### Step 1: : Clone the repository
```bash
  git clone https://git.cardiff.ac.uk/c1947381/uas-lifecycle-management-frontend.git
```

### Step 2: Run Backend Server 

Before you run backend server, you must run it first. It can be followed by clicking [here](https://git.cardiff.ac.uk/c1989132/uas-lifecycle-management/-/tree/dev/api).

### Step 3: Open an IntelliJ terminal

1. Open the project in intellij.
2. Click the terminal at the bottom left, or you can simply press ALT+12 to open the terminal

### Step 4: Build and Run the frontend Server
To Install dependencies and run project, from the terminal type the following.

```bash
npm install "&&" npm start
```

Run the cypress end-to-end test.

```bash
npm run cypress:open 
```

# Mock Users
There are 5 users in database which will allow you to log on the web application and experience the application.

Account Type | Email | Password |
--- | --- | --- |
CEO | ceo@test.com | password
COO | coo@test.com | password |
CTO | cto@test.com | password |
LO | logistic@test.com | password |

---

# Libraries and Tools Used
- React (Runs on Node.js)
    - [Redux](https://react-redux.js.org/) State Management
    - React Validation
    - React Spinners
- Material UI React Libary
    - Icons Material
- [JavaScript Chart.js](https://www.chartjs.org/docs/latest/)
- React Developer Tool- this react developer tool is downloadable from google extension and can be found [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
- Redux Developer Tool- this redux developer tool is downloadable from google extension and can be found here [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).


---
# Testing

### End-to-End testing
[Cypress Documentation](https://www.cypress.io/)

Cypress is used for End-to-End Testing. Cypress is a JavaScript test automation solution used for web automation. It enables teams to create web test automation scripts

---

# Deployment

