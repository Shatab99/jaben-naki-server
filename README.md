

# Api's For JABEN NAKI 

## Base Url : https://jaben-naki-server.vercel.app/


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
    "password": "password123",
    "role": "passenger"
  },
  "passenger": {
    "name": "John Doe",
    "dateOfBirth": "1990-05-15T00:00:00.000Z",
    "contactNumber": "1234567890",
    "isVerified": false,
    "role": "passenger",
    "rideHistory": []
  }
}

```


### Create-Driver
**URL**: [`https://jaben-naki-server.vercel.app/api/v1/user/create-driver`](https://jaben-naki-server.vercel.app/api/v1/user/create-driver)  
**Method**: `POST`

```json 
{
  "user": {
    "email": "driver.jane@example.com",
    "userName": "janeDriver",
    "password": "password123",
    "status": "good"
  },
  "driver": {
    "name": "Jane Doe",
    "dateOfBirth": "1985-07-22",
    "contactNumber": "1234567890",
    "complitedRides": 250,
    "category": "car",
    "isActive": true,
    "profileImg": "https://example.com/profile/jane.jpg",
    "rideHistory": []
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
  "from": "Downtown Station",
  "to": "Airport Terminal 1",
  "fare": "25.50",
  "type": "ride",
  "journeyStartTime": "02:10 PM"
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

---

This list now provides direct links to the production server endpoints on Vercel.
