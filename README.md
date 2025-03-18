# Charizard

This repository contains the source code for Charizard, a web application built with Next.js. Below are the setup instructions, including how to configure the environment variables.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started
To get started with this project, clone the repository:

```sh
git clone https://github.com/purefml/charizard.git
cd charizard
```

## Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy the `.env.example` file to `.env.local`:
   ```sh
   cp .env.example .env.local
   ```
3. Configure your environment variables as described below.

## Environment Variables
This project uses environment variables for configuration. You need to create a `.env.local` file in the root directory and set the following variables:

```
# Environment similar to NODE_ENV.
# Set to "production" for a fully functional application.
NEXT_PUBLIC_ENV=development
# NEXT_PUBLIC_ENV=preview
# NEXT_PUBLIC_ENV=production

# Enables additional debug features.
# Set to "true" for more debugging information (not recommended in production).
NEXT_PUBLIC_DEBUG=false

# Public URL of the application/website.
NEXT_PUBLIC_PUBLIC_URL=http://localhost:3000

# API/Backend base URL.
# Use the local API when running both frontend and backend locally.
# NEXT_PUBLIC_API_URL=http://localhost:9000
NEXT_PUBLIC_API_URL=https://charmander-cvi0.onrender.com
```

## Running the Application
Once the environment variables are set up, start the development server:

```sh
npm run dev
```

This will start the application at `http://localhost:3000`.

## Deployment
For deploying the application, set `NEXT_PUBLIC_ENV` to `production` and ensure all environment variables are correctly configured.

```sh
npm run build
npm start
```

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

