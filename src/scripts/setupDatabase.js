import { setupFirestoreData } from '../utils/setupFirestore.js';

// Run the setup
setupFirestoreData()
  .then(() => {
    console.log('Database setup completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error setting up database:', error);
    process.exit(1);
  }); 