# School Management API

A Node.js and MongoDB based REST API for managing school data.

## Features

- Add new schools
- Get schools sorted by nearest location
- Input validation
- Distance calculation using Haversine Formula
- MongoDB Database
- RESTful APIs

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

### Add School

POST `/api/schools/addSchool`

### List Schools

GET `/api/schools/listSchools`

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Live API

Add your Render URL here.

## Author

Chandra Pratap Singh
