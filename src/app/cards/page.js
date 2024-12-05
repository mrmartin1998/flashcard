'use client';

import Layout from '@/components/layout/Layout';
import CardList from '@/components/ui/CardList';
import CreateCardForm from '@/components/ui/CreateCardForm';

export default function CardsPage() {
  const handleCardCreated = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <CreateCardForm onCardCreated={handleCardCreated} />
            </div>
          </div>
          <div className="lg:w-2/3">
            <CardList />
          </div>
        </div>
      </div>
    </Layout>
  );
} 