import { checkFirestoreData } from '../utils/checkFirestore.js';

checkFirestoreData()
  .then(() => {
    console.log('\nDatabase check completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error checking database:', error);
    process.exit(1);
  }); 