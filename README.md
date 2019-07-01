# My architeture (How i did approach the problem) - assumptions included.

First of all, deciding the development stack... it is a MVP, then, using less frameworks and libraries and having a certain pattern is a good thing. Since it is full stack web app, using a single framework / language that allows me to handle all of it, will be great, and also, i have experience with Node.JS and React.JS so it is a great fit, not to mention that a JavaScript web app can be very lightweight. After all this thoughts, then i decided to use that stack of development. Well, now thinking more about the future, in other words, thinking on app scalability, Redux is a must have on this scenario. About the server, i went through a more default way, that is using ExpressJS to make the server listen to url requests. Besides that, the TMDB Api documentation says that there is a usage limit of the API, then, to keep things running ok, i added a lib to handle my fetch requests and Limit them as a promises queue. So i can keep doing requests to the API and it will handle ok besides the usage limits specified on TMDB Api DOCs, that i have configured on the api config file, and used as parameter on the RateLimiter. Well, now coming to the UX / UI / Design , i decided to use AntDesign as UI Framework because it is lightweight and have a interesting thing that is the card preloader, called "Skeleton" that i used to preload the Movie Cards. Also i did work with Dark Flat Design inspired on the most popular movie websites. Before starting the front-end development i created a Design Prototype on Figma, to make sure that the final result of the App's Design will be great. Figma Prototype Avaliable Here: https://www.figma.com/file/bJpRlU9Ua9IhnL1D3hPUIx6D/Upcoming-Movies-List. And then i started the development of the back-end, and tested it, when it was done, i started the front-end development and then finished the application. As deployment i used Docker Compose to make the deploy and runs easier.

(As a Plus, i do prepared a request for getting Upcoming Movies separated by Genres, to be used on the future.)

# Build instructions

Navigate to the root of the project where is located the docker-compose.yml file and run `docker-compose up` and docker will do the har work.

So just access the website that is running on the address shown on console, that is probably `http://localhost:3000`.


# List of third party libraries and why i used them

- AntDesign (UI Framework) - I used it because of the simplicity, its lightweight, have modern flat design, and it haves Layout and a very useful preloader (Skeleton) that i used on the movie cards for UX.
- Redux (State Manager) + Redux Saga - Redux is a must have for apps that are going to scale, because the single source of truth, flexibility of dispatching actions, and its concepts, and the Redux Saga is the most known middleware best suit for API requests.
- ExpressJS - The most used, most popular, simpler, and best http server listener that can have routing and it handles several types of requests and send back responses to me with statuses in several ways.
- React Router - This is the best router that React have actually, a must have in a application that can scale to many routes.
- react-search-field - this is a npm package that i found on the web to save me some work on the search movies feature so i can focus on more important things.
- react-svg - another npm package i found that makes easier to handle and display SVGs on the application.
- url-join - small npm package just to save me some work on request handling.
- request-rate-limiter - this is a npm package that i used on the server that works like a promise queue, i used it on the TMDB Api Requests, because it haves request rate limiter and timeout configurations that i can specify, so my API requests will be always working at a rythm that TMDB Api will not reach its usage limit.
