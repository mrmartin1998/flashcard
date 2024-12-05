// Import the Navbar component from the same directory
import Navbar from './Navbar';

// Layout component - Provides consistent page structure and styling
// Accepts children props to render the main content
const Layout = ({ children }) => {
  return (
    // Main container div that takes up full viewport height with base background
    <div className="min-h-screen bg-base-100">
      {/* Include the navigation bar at the top */}
      <Navbar />
      {/* Main content area with responsive container, horizontal padding and vertical spacing */}
      <main className="container mx-auto px-4 py-8">
        {/* Render the child components passed to Layout */}
        {children}
      </main>
    </div>
  );
};

// Export Layout component as default export
export default Layout;