# Book-Up Backend
This project provides the necessary API for the [Book-Up Frontend](https://code.fbi.h-da.de/bookup/bookup-frontend)

## Installation




## Features

## Stage
The stageing environment of this project can be found [here](https://bookup-backend.herokuapp.com/).

Test User:
email: test@gmail.com
password: test

## API Documentation
### User

User Object Reference:
```
{
  id: number;
  userName: string;
  email: string;
  password: string
  availableTime: DayAvailability[];
  emailVerifiedAt: Date;
  imageId: ProfilePhoto;
  eventTypes: EventType[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp;
}
```



##### Register User

Request:
```
POST /user/register

Content-Type:application/json

{
    "userName": string,
    "email": string,
    "password": string
}
```

Response:
```JSON
{
    "data": User
}
```

##### Login User


Request:
```
POST /user/token

Content-Type:application/json

{
    "userName": string,
    "password": string
}
```

Response:
```JSON
{
    "data": string      # returns authorized token from User
}
```


##### Get all Users

Request:
```
GET /user/
```

Response:
```JSON
{
    "data": User[]
}
```

##### Get User

Request:
```
GET /user/:id
```

Response:
```JSON
{
    "data": User
}
```

##### Update User

Request:
```
PATCH /user/:id

Content-Type:application/json

{
    "userName": string,
    "password": string
}
```

Response:
```JSON
{
    "data": User    # returns updated User
}
```
##### Delete User

Request:
```
DELETE /user/:id
```

Response:
```JSON
{
    "message": string;
}
```

### Invitee

Invitee Object Reference:
```
{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

##### Get all Invitees

Request:
```
GET /invitee/
```

Response:
```JSON
{
    "data": Invitee[]
}
```

##### Create Invitee

Request:
```
POST /invitee/

Content-Type:application/json

{
    "fistname": string,
    "lastname": string,
    "email": string,
}
```

Response:
```JSON
{
    "data": Invitee
}
```

##### Delete Invitee

Request:
```
DELETE /invitee/:id
```

Response:
```JSON
{
    "message": string;
}
```




### Booking

Booking Object Reference:
```
{
  id: string;
  date: Date;
  status: Enum;
  invitee: Invitee;
  eventType: EventType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

##### Get all Bookings

Request:
```
GET /booking/
```

Response:
```JSON
{
    "data": Booking[],
}
```

##### Get All Bookings from User

Request:
```
GET /booking/all/:userId
```

Response:
```JSON
{
    "data": Booking[],
}
```


##### Day Availability

DayAvailability Object Reference:
```
{
  id: number;
  user: User;
  day: enum;
  fromTimeHour: number;
  fromTimeMinute: number;
  endTimeHour: number;
  endTimeMinute: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
```

Request:
```
POST /tracking/

Content-Type:application/json

{
    "date": Date,
    "status": integer,
    "invitee": Invitee,
    "eventType": EventType,
}
```

Response:
```JSON
{
    "data": Tracking    # returns the created Booking
}
```

##### Delete Booking

Request:
```
DELETE /booking/:id
```

Response:
```JSON
{
    "message": string;
}
```

##### Create Booking

Request:
```
POST /tracking/

Content-Type:application/json

{
    "date": Date,
    "status": integer,
    "invitee": Invitee,
    "eventType": EventType,
}
```

Response:
```JSON
{
    "data": Tracking    # returns the created Booking
}
```

##### Delete Booking

Request:
```
DELETE /booking/:id
```

Response:
```JSON
{
    "message": string;
}
```


## Testing


This project uses automated tests to make sure that the API runs correctly. You can find those test in `/test`.
Furthermore, you can import the Postman-Collection provieded in `/Postman` to your Postman client and execute the given tests to convince yourself that the routes are working.  


When working with Postman, make sure to adjust the request so you are refencing existing ids, when working with foreign keys, otherwise you will run in 500 Errors. 

You will also need to adjust the Postman requests for routes that need an authorization. You can distinguish between routes that need an authorization and routes that don't need an authorization by looking into the `Headers` field of the Postman request. 
If the `Headers` field looks like this:

![Postman Request with Authorization Header](images/With_Authorization.png)

then you will need to put the JWT into the value field (marked with a red arrow in the picture above).

To get the JWT, you need to run `Register User` request first. Then log in via `Login User by Email and Password` request. If you logged yourself in correctly, you will recieve the JWT as shown in the following picture.     

![Login returns JWT](images/Login_returns_JWT_LI.jpg)


## License
MIT License

Copyright (c) Facebook, Inc. and its affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

MIT © [Book-Up]()