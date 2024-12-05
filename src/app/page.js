// Import the Layout component which provides the page structure and navigation
import Layout from '@/components/layout/Layout';
// Import the Flashcard component that displays interactive flashcards
import Flashcard from '@/components/ui/Flashcard';

// Home component - Main landing page of the Flashcard application
export default function Home() {
  return (
    // Wrap page content in Layout component for consistent styling
    <Layout>
      {/* Hero section that takes up 80% of the viewport height */}
      <div className="hero min-h-[80vh]">
        {/* Center content both horizontally and vertically */}
        <div className="hero-content text-center">
          {/* Container with max width and centered flex layout */}
          <div className="max-w-md flex flex-col items-center gap-8">
            {/* Main heading */}
            <h1 className="text-3xl font-bold">Welcome to Flashcard App</h1>
            {/* Descriptive text with vertical padding */}
            <p className="py-6">Start learning with interactive flashcards. Click the card below to try it out!</p>
            {/* Demo flashcard with sample content */}
            <Flashcard 
              front="What is React?"
              back="A JavaScript library for building user interfaces"
            />
            {/* Call-to-action button styled with primary color */}
            <button className="btn btn-primary">Create Your First Card</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
