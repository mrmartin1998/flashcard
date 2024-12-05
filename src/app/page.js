// Import Layout component for consistent page structure and navigation across the app
import Layout from '@/components/layout/Layout';
// Import Flashcard component that handles the interactive card flip functionality
import Flashcard from '@/components/ui/Flashcard';
// Import Link component from Next.js for client-side navigation between pages
import Link from 'next/link';

// Home component serves as the landing page of the application
// Displays a welcome message, demo flashcard, and call-to-action button
export default function Home() {
  return (
    // Layout wrapper provides consistent styling and navigation structure
    <Layout>
      {/* Hero section spans most of the viewport for visual impact */}
      <div className="hero min-h-[80vh]">
        {/* Hero content container centers all child elements */}
        <div className="hero-content text-center">
          {/* Inner container limits content width and arranges items vertically */}
          <div className="max-w-md flex flex-col items-center gap-8">
            {/* Main title of the application */}
            <h1 className="text-5xl font-bold">Welcome to Flashcard App</h1>
            {/* Instructional text for the demo flashcard */}
            <p className="py-6">Start learning with interactive flashcards. Click the card below to try it out!</p>
            {/* Demo flashcard component with example React definition */}
            <Flashcard 
              front="What is React?"
              back="A JavaScript library for building user interfaces"
            />
            {/* Navigation link wrapped around primary CTA button */}
            <Link href="/cards">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
