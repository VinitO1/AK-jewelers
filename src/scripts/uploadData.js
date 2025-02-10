import { uploadDataToFirestore } from '../utils/uploadDataToFirestore';

// Run this function once to upload all data
uploadDataToFirestore().then(() => {
  console.log('Data upload complete!');
}).catch(error => {
  console.error('Error uploading data:', error);
}); 