# Image Processing API
###### Nicole Moyo (Facilitated by Udacity - Fullstack Javascript Developer Certification)

The API allows resizing of images based on the dimensions specified in the url parameters. A request is sent to the /api/images endpoint with the following format

``` 
localhost:3000/api/images?image=${image_name}&width=${width_of_resized_image}&height=${height_of_resized_image} 
```

- *${image_name} should be the name of an image file that exists in the file system (see src/assets/full directory), else the api will send an error message*
- *${image_name} should not contain the file extension i.e. imagename.jpg ❌ --> imagename ✅*
- API currently supports processing of jpg images only

## Getting Started

#### Install node_modules with required dependencies
```
npm install
```

## Start the application server

#### Run dev server (src/index.ts) with nodemon
```
npm run start
```
This runs the script nodemon src/index.ts
**See package.json for definition of all scripts*

#### Make requests
Navigate to the browser and type in the search bar 

``` 
localhost:3000/api/images?image=${image_name}&width=${width_of_resized_image}&height=${height_of_resized_image} 
```

Example request: 

![image](https://user-images.githubusercontent.com/71017261/210187281-885e1d52-a5a6-41d8-aeb4-9aefe3ce16a4.png)

Example response:

![image](https://user-images.githubusercontent.com/71017261/210187307-dde3e553-acaa-4d63-933e-2f5a91f5e804.png)


## Build application
```
npm run build
```
This will create a build folder in the image-processing-api directory with Typescript files compiled to Javascript (image-processing-api/build)

#### Run the build application server 

``` 
node ./build/.
```
OR 

```
node ./build/index.js
```

## Test application 

#### Run Jasmine tests

```
npm run test 
```

OR 

```
npm run build
npm run jasmine
```

#### Run prettier to check for inconsistencies in formatting

```
npm run prettier 
```

#### Run eslint for linting

```
npm run lint
```
