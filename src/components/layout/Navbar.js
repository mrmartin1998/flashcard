// Navbar component - Provides the top navigation bar for the application
// Import Next.js Link component for client-side navigation between pages
import Link from 'next/link';

// Navbar functional component that renders the top navigation bar
const Navbar = () => {
  return (
    // Main navbar container with base background color from DaisyUI theme
    <div className="navbar bg-base-100">
      {/* Left side of navbar containing app title/logo
          flex-1 makes this section grow to take available space */}
      <div className="flex-1">
        {/* Home link styled as a ghost button with larger text */}
        <Link href="/" className="btn btn-ghost text-xl">Flashcard App</Link>
      </div>
      {/* Right side of navbar containing navigation links
          flex-none prevents this section from growing */}
      <div className="flex-none">
        {/* Horizontal menu list with padding on x-axis */}
        <ul className="menu menu-horizontal px-1">
          {/* Navigation link to the cards page */}
          <li><Link href="/cards">My Cards</Link></li>
        </ul>
      </div>
    </div>
  );
};

// Export Navbar component for use in other parts of the application
export default Navbar;