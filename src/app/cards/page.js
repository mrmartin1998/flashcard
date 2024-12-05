'use client'; // Mark this as a client-side component in Next.js

// Import required components
import Layout from '@/components/layout/Layout';
import CardList from '@/components/ui/CardList';
import CreateCardForm from '@/components/ui/CreateCardForm';

// CardsPage component - Main page for managing flashcards
export default function CardsPage() {
  // Handler function called when a new card is created
  const handleCardCreated = () => {
    // Force a re-render of the CardList component by reloading the page
    // This ensures the new card appears in the list immediately
    window.location.reload();
  };

  return (
    // Wrap page content in Layout component for consistent styling
    <Layout>
      {/* Main container with auto margins and padding */}
      <div className="container mx-auto px-4 py-8">
        {/* Flex container that switches from column to row layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Create Card Form */}
          {/* Takes up 1/3 of the width on large screens */}
          <div className="lg:w-1/3">
            <CreateCardForm onCardCreated={handleCardCreated} />
          </div>
          
          {/* Right side - Card List */}
          {/* Takes up 2/3 of the width on large screens */}
          <div className="lg:w-2/3">
            <CardList />
          </div>
        </div>
      </div>
    </Layout>
  );
} 