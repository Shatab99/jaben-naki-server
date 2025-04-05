

# Api's For JABEN NAKI 

## [`Live Link 🌍`](https://jaben-naki-server.vercel.app/) [`Project Architecture 📍`](https://www.figma.com/board/Legdx54d7O2mI4pHxWFZKA/Jaben-naki-thesis-Project?t=0Yau3f8ZJy6ig6Ej-0) 


## API Endpoints

Below is a list of API endpoints for your project. Click each link to view the endpoint or copy it manually.

### Create-Passenger
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/user/create-passenger`](https://jaben-naki-server.vercel.app/api/v1/user/create-passenger)  
**Method**: `POST`

```json 

{
  "user": {
    "email": "passenger.jane@example.com",
    "userName": "johndoe123",
    "password": "password123"
  },
  "passenger": {
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "contactNumber": "1234567890"
  }
}

```


### Create-Driver
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/user/create-driver`](https://jaben-naki-server.vercel.app/api/v1/user/create-driver)  
**Method**: `POST`

```json 
{
    "user": {
      "email": "johndoe@example.com",
      "userName": "johndoe123",
      "password": "securePass123"
    },
    "driver": {
      "name": "John Doe",
      "dateOfBirth": "1990-05-15",
      "contactNumber": "0123456789",
      "isActive": true,
      "profileImg": "https://example.com/images/driver-profile.jpg"
    },
    "carDetails": {
      "carSerialNo": "ABC123456789",
      "category": "car",
      "carImg": "https://example.com/images/car.jpg",
      "carColor": "Blue"
    }
  }

```



### Create-Admin
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/user/create-admin`](https://jaben-naki-server.vercel.app/api/v1/user/create-admin)  
**Method**: `POST`

```json 

{
  "user": {
    "email": "admin.jane@example.com",
    "userName": "janeAdmin",
    "password": "password123",
    "status": "good"
  },
  "admin": {
    "name": "Jane Doe",
    "contactNumber": "1234567890",
    "complitedRides": 250,
    "category": "car",
    "isActive": true,
    "profileImg": "https://example.com/profile/jane.jpg"
  }
}

```


### Post a Ride by Driver
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/ridePosts/post-ride`](https://jaben-naki-server.vercel.app/api/v1/ridePosts/post-ride)  
**Method**: `POST`


```json
{
  "pickUpPoint":"Mohammadpur",
  "from": "Dhaka",
  "to": "Faridpur",
  "fare": "300",
  "totalSeats" : 4,
  "type": "ride",
  "journeyStartTime" :"03:10 PM"
}



```

### Login
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/auth/login`](https://jaben-naki-server.vercel.app/api/v1/auth/login)  
**Method**: `POST`

```json
{
  "email":"driver.jane@example.com",
  "password":"password123"
}

```


### Appeal for KYC
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/kyc/for-appeal`](https://jaben-naki-server.vercel.app/api/v1/kyc/for-appeal)  
**Method**: `POST`

```json 

{
  "NIDSerial": "NID123456789",
  "drivingLincenseSL": "DL987654321",
  "dateOfBirth": "1990-05-12",
  "driverPic": "https://example.com/driver-pic.jpg",
  "driverLinsensePic": "https://example.com/license-pic.jpg"
}

```


### Confirm Appeal (Admin Only)
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/kyc/confirm-appeal`](https://jaben-naki-server.vercel.app/api/v1/kyc/confirm-appeal)  
**Method**: `PATCH`

```json 

{
  "email" : "driver.jane@example.com"
}

```

### Get Me Passenger
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/passenger/me`](https://jaben-naki-server.vercel.app/api/v1/passenger/me)  
**Method**: `GET`

### Get Me Driver
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/driver/me`](https://jaben-naki-server.vercel.app/api/v1/driver/me)  
**Method**: `GET`

### Get Me Admin
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/admin/me`](https://jaben-naki-server.vercel.app/api/v1/admin/me)  
**Method**: `GET`

### Cancel / Remove Ride Post
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/ridePosts/cancel-ride/{rideId}`](https://jaben-naki-server.vercel.app/api/v1/ridePosts/cancel-ride/671b3cbf6a71664d7498a57b)  
**Method**: `DELETE`

### Get All Ride Posts (Email Query Included)
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/ridePosts/get-all-rideposts?email={email}`](https://jaben-naki-server.vercel.app/api/v1/ridePosts/get-all-rideposts?email=driver.jane@example.com)  
**Method**: `GET`

### Get All Appeals (Admin)
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/kyc/get-all-appeals`](https://jaben-naki-server.vercel.app/api/v1/kyc/get-all-appeals)  
**Method**: `GET`

### Book A Ride (Passenger) :Id will be ridePosts _id
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/book-ride/:id`](https://jaben-naki-server.vercel.app/api/v1/book-ride/:id)  
**Method**: `POST`

```json 

{
  "numberOfSeats": 1
}

```

### Edit Seat (Passenger) :Id will be bookRides  _id
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/book-ride/edit-seat/:id`](https://jaben-naki-server.vercel.app/api/v1/book-ride/edit-seat/:id)  
**Method**: `PATCH`

```json 

{
  "numberOfSeats": 1
}

```

### Cancel Ride (Passenger) :Id will be bookRides  _id  
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/book-ride/cancel/:id`](https://jaben-naki-server.vercel.app/api/v1/book-ride/cancel/:id)  
**Method**: `DELETE`

### When click or press Start Ride Button In his ride post (Driver)
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/startRide/started-ride/:ridePostId`]()  
**Method**: `POST`

### When click or press Complete Ride Button In his start ride section (Driver) 
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/completeRide/complete-the-ride/:startRideId`]()  
**Method**: `POST`

### Show all driver ride history (Driver) 
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/completeRide/driver-history`]()  
**Method**: `GET`

### Show all passenger ride history (Passenger) 
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/completeRide/passenger-history`]()  
**Method**: `GET`

### verify Email 
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/auth/verifyMail`]()  
**Method**: `POST`

---

This list now provides direct links to the production server endpoints on Vercel.
