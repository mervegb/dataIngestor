# Track Importer

This application is designed to import track data from a spreadsheet into a MongoDB database. It handles validation and error logging, ensuring that each track is associated with a contract if specified.

## Requirements

Node.js

npm or yarn

Docker (for running MongoDB locally)

## Getting Started

### Setting Up the Database

To run MongoDB on your local machine without manual installation, you can use Docker. This simplifies the setup process and ensures consistency across different development environments. Here’s how to get MongoDB running with Docker:

```bash

docker run --name mongodb -d -p 27017:27017 mongo
```


## **Installation**

Clone the repository and install the dependencies:

```
git clone [repository-url]
cd [repository-name]
npm install
```


## **Configuration**

Before running the application, ensure you configure the necessary environment variables. Create a **.env** file in the root directory and specify the MongoDB URI:

```
MONGO_URL= mongodb://localhost:27017/{databaseName}
```

## **Running the Application**

To start the application, run:

```
nodemon index.js or node index.js
```

## **Running Tests**

To ensure that the application behaves as expected, you can run the automated tests with:

```
npm test
```

This command runs the Mocha tests to verify the functionality of the track importing logic and error handling.
