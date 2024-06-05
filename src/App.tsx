import React from 'react';
import './App.css';
import Create from './components/create-account';
import Delete from './components/delete-account';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: React.FC = () => {
  return (
    // Main container with flex layout
    <div className="h-screen flex flex-col lg:flex-row" style={{ backgroundImage: 'url("background-app.jpg")', backgroundRepeat: 'repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      {/* First column for Create component */}
      <div className="flex-1 flex justify-center items-center p-4">
        <Create />
      </div>
      {/* Second column for Delete component */}
      <div className="flex-1 flex justify-center items-center p-4">
        <Delete />
      </div>
    </div>
  );
}

// Exporting the App component as default
export default App;
