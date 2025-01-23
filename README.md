# SXNY



A full-stack TypeScript application with a React frontend and a Node.js backend.
Built using the [SpaceTraders.io](https://docs.spacetraders.io/) API

You can view it here: https://sxny.vercel.app/ <br>
IF YOU'RE GETTING ERRORS FROM THIS LINK, ITS BECAUSE THE API KEY FOR SPACETRADERS RESETS EVERY 2 WEEKS AND I HAVEN'T UPDATED THE KEY AGAIN

<div style="display: flex; align-items: center; gap: 1rem;">
  <img src="https://github.com/user-attachments/assets/fd1cdf62-4b5b-4a0a-9d5d-9828a40b4456" alt="Landscape Screenshot" style="width: 70%; object-fit: contain;">
  <img src="https://github.com/user-attachments/assets/0ed77577-9773-412c-b19f-98c3ca6054ec" alt="Portrait Screenshot" style="height: 350px; object-fit: contain;">
</div>

---

## Table of Contents

1. [Tech Considerations](#tech-considerations)
2. [How to Install](#how-to-install)
3. [How to Setup](#how-to-setup)
4. [Devlog](#devlog)
5. [Future Development](#future-development)

---

## Tech

### Backend

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ORM
- **Language:** TypeScript
- **Testing:** Vitest, Supertest
- **Utilities:**
  - `dotenv` for environment variables
  - `cors` for cross-origin resource sharing
  - `axios` for HTTP requests

### Frontend

- **Framework:** React (with React Router)
- **State Management:** React Query
- **Styling:** Tailwind CSS
- **Charts/Graphs:** Recharts
- **Testing:** Testing Library, Vitest
- **Build Tool:** Vite with TypeScript
- **Linting:** ESLint with React Hooks plugin
- **Utilities:**
  - `axios` for HTTP requests

---

## Tech Considerations

- **State Management:** I used [React Query](https://tanstack.com/query/latest) as it provides many different features out of the box, specifically for this project i'm using it for its auto caching, maintaining caching across page routing, mutation api and making my code much more readable and maintainable. It also comes with some great [devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- **Database:** I used Mongoose for structured schemas and preparing for more relation data in future
- **Testing:** I used [Vitest](https://vitest.dev/) for a quicker setup
- **Styling:** I used TailwindCSS as I am able to rapidly style my components with predefined utility classes
- **Charts/Graphs:** I used Recharts to add some variation to my components, make them a bit more interesting visually
- **axios:** I used axios in the front end purely to make my code cleaner, easier to read plus it parses to JSON by default, I could have used native fetch but I'm happy with my choice.

I have this dockerised and deployed to an EC2 instance.

## How to Install

### Backend

1. Clone the repository and navigate to the `backend` directory:
   ```bash
   git clone https://github.com/liamsegura/sxny.git
   cd sxny/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## How to Setup

### Spacetraders API Key

Register your api key using [this](https://docs.spacetraders.io/quickstart/new-game):

```bash
curl --request POST \
 --url 'https://api.spacetraders.io/v2/register' \
 --header 'Content-Type: application/json' \
 --data '{
    "symbol": “YOURNAME521”,
    "faction": "COSMIC"
   }'
```

### Mongo URI

1. **Create Cluster**: Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. **Set Up Access**: Add a user (username/password) and allow access from anywhere.
3. **Get URI**: Go to **Clusters**, click **"Connect"** > **"Connect Your Application"**, and copy the URI.

### Backend

1. Create a `.env` file in the `backend` directory with the following:
   ```plaintext
   SPACETRADERS_API_KEY={YOUR_API_KEY}
   MONGO_URI={YOUR_DB_STRING}
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Create a `.env` file in the `frontend` directory with the following:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Running Tests

1. Navigate to frontend/backend folder and run:
   ```
   npm run test
   ```

---

### Backend Structure:

- **src**
  - **--tests--**: Basic API integration tests. Testing API routes and the fetchAndCache utility.
  - **config**: Database connection using Mongoose.
  - **models**: Schema for cached documents. It stores a unique key and a timestamp. When checking the cache, it compares the timestamp with the current time to determine if it needs to refetch the data.
  - **routes**: Handles routing, calls services, and responds with data.
  - **services**: Services are called by the router. They check the cache in MongoDB and decide whether to use the Space Traders API or the cached data.
  - **utils**: Folder for constants and the fetchAndCache function.
    - **fetchAndCache**: Takes a key, a fetch function, and a forceRefresh boolean. If `forceRefresh` is true, it refreshes the data. Otherwise, it checks if the cache exists and whether it has expired. If the cache is still valid, it returns it. If not, it calls the function to fetch new data from Space Traders.

### Frontend Structure:

- **src**
  - **components**
  - **hooks**: Here are my custom hooks which fetch from my BE routes, I have tests setup for these also
  - **pages**
  - **routes**: Handles routing, calls services, and responds with data.
  - **services**: Services are called by the custom hooks using React Query. The response is cached.
  - **utils**: Folder for constants and other small utility functions.

---

## Devlog

First thing I do, read the documentation. I haven't heard of SpaceTraders, so I need to understand what it is. I couldn't find any example projects using v2 of the API, only v1 which seems completely different. Loans don't seem to exist anymore for example. After messing around with thunder client I got some working routes to see what kinda data i can use, the documentation leaves a lot to be desired, but we continue!

After my initial interview, Alex explained that we would be working on POC-type work. With this in mind, I decided that user login, registration and route protection would not be prioritised.

Currently, there isn't any account management built into the SpaceTraders API.

If I had more time, I would create authenticate, possibly with an OAuth provider. On the initial login, I would save this user and register a new agent, saving the API key to MongoDB and implement route protection using middleware.

**Main Focus:**

I want to create a dashboard, and some routing between pages.

Things I want to implement:

- Agent information
- Current ships
- Available ships for sale
- Functionality to Purchase ships
- Factions
- Cached results
- Tests

**Note to self:**

- There was a strange bug where MongoDB wouldn’t connect but didn’t specify why. After switching my Node version to 20, it fixed the connectivity issue. I use node 18.14 for work.

---

## Backend

**API Layer:**

I created separate API layers for both the frontend and backend. They follow a similar structure and include constants, making it easier to change values.

**Backend Cache Utility:**

I created a utility that takes a key and an API call function. It checks if the data exists in the cache, and if the cache hasn’t expired, it returns the cached data. If not, it runs the API call function to fetch new data and saves it to MongoDB.

## Frontend

### My Process:

I start by getting the functionality working before optimising. Once the frontend is receiving data from the endpoints, I focus on optimisation.

I move data fetching into custom hooks to handle data transformations outside the components. This ensures that components only use the necessary data.

Inside the custom hooks, I use React Query to fetch from the endpoint. React Query handles loading and error states, so there’s no need for local state in the components.

I create custom hooks for fetched API data. In some cases, I combine these hooks into a "page-specific" hook. This way, I can combine loading and error states for the combined hooks, so I don’t need to handle transformations in my components. This creates some duplication in `useOverviewPateData.ts` and `useFleetPageData.ts`, however not all duplication is bad duplication, this is managable and readable IMO.

**Example:**

```javascript
const { ships, isShipsLoading, isShipsError } = useShips()
const { agent, isAgentLoading, isAgentError } = useAgent()

const isLoading = isShipsLoading || isAgentLoading
const isError = isShipsError || isAgentError

if (isLoading || isError) {
  return <Skeleton />
}
```

**Becomes:**

```javascript
const { ships, agent, isLoading, isError } = useSpecificPage()

if (isLoading || isError) {
  return <Skeleton />
}
```

Much nicer!

When my data is loading from my hooks, I use a skeleton component, I also have this skeleton component in my `<App />` for a fallback when lazy loading my pages. Lazy loading my pages allows for a smaller bundle size, I only load the page specifically rather than everything up front.

### Purchasing a ship is interesting.

For it to work, I need to first find a shipyard, then find a ship available to purchase. But I also need to actually have a ship at that shipyard to see the prices and purchase a ship.

So not entirely straight forward, so I looked at listing my current ships, noting the waypoints and searching for a shipyard that way.

Due to time constraints, i decided to just use my first default ship. I located a shipyard but I must have wasted a good half hour before realising that the first ship will never be AT a shipyard, because its a command ship???

This is not documented anywhere that I can find... but luckily after trail and error, using the second ship has access to a shipyard by default.

I have limited it to only 3 ships being purchasable, so make sure you're using a fresh api key

We can now purchase a ship!

### Adding some flair

One thing I like to do lastly, is think of a design, something I have always been interesting in is UX design. Althought my goal is to show you how I choose to tackle a project like this from a best practices point of biew, I also want it to be visually pleasing.

One thing I really like is shadcn's clean look, something that vercel uses. It's very simplistic so designing my components around this will be much quicker, but is also very fitting for the theme.

I also included some images across the pages.

I used my own webapp to process the images to be dithered in a 1bit style, something I am using for a game I'm building for [https://itch.io/jam/ditherjam](ditherjam), which uses a bayer ordered matrix. I think this works really nice given the space theme. You can find my app here: https://github.com/liamsegura/1bit-ordered-dithering

![dithered_image - 2024-11-30T235249 596](https://github.com/user-attachments/assets/f45a7823-e6b2-4f50-89ec-6fa6fab9674f)

## Future development

There are areas that could be expanded, for example, id like the ability to travel to more more shipyards, have a more dynamic way of accessing available ships.

Id like to implement authentication, saving the user data to mongodb, using the api key to validate the user so that i can protect routes with a middleware.

Also a way to register an agent, since the API updates every 2weeks I would need to inforce a way to update that key, similarly to how I handle caching, I could register a new agent when the key is due to expire to get around that. Unfortunatly that would mean starting your agent from scratch but that is the limitation with SpaceTraders current v2 api.

I had started working on contracts, so having access to contracts within the agent page would be interesting.
