# SEI23_Chat

This application was developed purely for the intent of learning Socket.IO, Axios APIs in MERN stack.

[Link To APP](https://sei23chat.herokuapp.com/)

---------------------------------------

## Technologies Used

1. React
2. NodeJS
3. Express
4. MongoDB
5. Socket.IO
6. Axios
7. Jsonwebtoken

---------------------------------------
## Approach Taken

#### Weather and News update

By using infoip API, I am able to retrieve the user rough location. By using the location, it will call for the news and weather with respect to the user location using Axios. 

For example below, if the user is from Singapore.

![User from Singapore](https://raw.githubusercontent.com/zacktjc/sei23_chat/master/img/Screenshot%202020-09-22%20at%204.47.19%20PM.png)

If User is from Germany 

![User from Germany](https://raw.githubusercontent.com/zacktjc/sei23_chat/master/img/Screenshot%202020-09-22%20at%204.49.34%20PM.png)

If User is from Hong Kong 

![User from Hong Kong](https://raw.githubusercontent.com/zacktjc/sei23_chat/master/img/Screenshot%202020-09-22%20at%204.50.22%20PM.png)

#### Weather and News update

Working with Socket.io to create a real-time communication application. Users are able to send and receive messages without refreshing their page. Chat logs are saved using MongoDB for future references.

![Global Chatroom](https://raw.githubusercontent.com/zacktjc/sei23_chat/master/img/Screenshot%202020-09-22%20at%204.48.30%20PM.png)

## Future Plans
-----------------------------------

1. Chat Room to find other users to play with
2. Better UX/UI
3. Notification Button
4. Friend List
5. Hire/Reject/Complete, rating system
6. Handle payments

## API used
-----------------------------------

1. infoip
2. OpenWeatherMap
3. News API
