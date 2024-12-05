// Import the Layout component from the components directory
import Layout from '@/components/layout/Layout';

// Home component - Main landing page of the Flashcard application
export default function Home() {
  return (
    // Wrap content in Layout component for consistent page structure
    <Layout>
      {/* Center-aligned content container */}
      <div className="text-center">
        {/* Main heading with large bold text */}
        <h1 className="text-4xl font-bold mb-4">Welcome to Flashcard App</h1>
        {/* Subheading with descriptive text */}
        <p className="text-lg mb-8">Start creating your flashcards to enhance your learning!</p>
        {/* Primary call-to-action button */}
        <button className="btn btn-primary">Create Your First Card</button>
      </div>
    </Layout>
  );
}
