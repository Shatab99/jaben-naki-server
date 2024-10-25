

# Api's For JABEN NAKI 

## Base Url : https://jaben-naki-server.vercel.app/


## API Endpoints

Below is a list of API endpoints for your project. Click each link to view the endpoint or copy it manually.

### Create-Passenger
**URL**: [`${base-url}/api/v1/user/create-passenger`](http://localhost:5000/api/v1/user/create-passenger)  
**Method**: `POST`

### Create-Driver
**URL**: [`${base-url}/api/v1/user/create-driver`](http://localhost:5000/api/v1/user/create-driver)  
**Method**: `POST`

### Create-Admin
**URL**: [`${base-url}/api/v1/user/create-admin`](http://localhost:5000/api/v1/user/create-admin)  
**Method**: `POST`

### Post a Ride by Driver
**URL**: [`${base-url}/api/v1/ridePosts/post-ride`](http://localhost:5000/api/v1/ridePosts/post-ride)  
**Method**: `POST`

### Create-RidePosts
**URL**: [`${base-url}/api/v1/ridePosts/post-ride`](http://localhost:5000/api/v1/ridePosts/post-ride)  
**Method**: `POST`

### Login
**URL**: [`${base-url}/api/v1/auth/login`](http://localhost:5000/api/v1/auth/login)  
**Method**: `POST`

### Appeal for KYC
**URL**: [`${base-url}/api/v1/kyc/for-appeal`](http://localhost:5000/api/v1/kyc/for-appeal)  
**Method**: `POST`

### Confirm Appeal (Admin Only)
**URL**: [`${base-url}/api/v1/kyc/confirm-appeal`](http://localhost:5000/api/v1/kyc/confirm-appeal)  
**Method**: `PATCH`

### Get Me Passenger
**URL**: [`${base-url}/api/v1/driver/me`](http://localhost:5000/api/v1/driver/me)  
**Method**: `GET`

### Cancel / Remove Ride Post
**URL**: [`${base-url}/api/v1/ridePosts/cancel-ride/{rideId}`](http://localhost:5000/api/v1/ridePosts/cancel-ride/671b3cbf6a71664d7498a57b)  
**Method**: `DELETE`

### Get All Ride Posts (Email Query Included)
**URL**: [`${base-url}/api/v1/ridePosts/get-all-rideposts?email={email}`](http://localhost:5000/api/v1/ridePosts/get-all-rideposts?email=driver.jane@example.com)  
**Method**: `GET`

### Get All Appeals (Admin)
**URL**: [`${base-url}/api/v1/kyc/get-all-appeals`](http://localhost:5000/api/v1/kyc/get-all-appeals)  
**Method**: `GET`

---

This format gives clear access to each API endpoint while keeping the information readable and accessible for others.
