// Import the ImageKit SDK
const ImageKit = require("@imagekit/nodejs");

// Initialize the ImageKit client with credentials from environment variables
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,    // Your ImageKit public key
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,  // Your ImageKit private key
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT // Your ImageKit URL endpoint
});

// Export the ImageKit instance to use it in other parts of your application
module.exports = imagekit;

/* 
  -----------------------------------------------
  WHAT THIS CODE DOES:
  1. Imports the official ImageKit Node.js SDK.
  2. Creates an instance of ImageKit using environment variables for security.
     - publicKey: Used for client-side operations like uploading images from frontend.
     - privateKey: Used for server-side operations (must be kept secret).
     - urlEndpoint: Base URL for your ImageKit account for accessing images.
  3. Exports the ImageKit instance so that you can use it anywhere in your Node.js project 
     (e.g., uploading images, generating URLs, resizing images, etc.).
  -----------------------------------------------
*/