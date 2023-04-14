import Navbar from '@/components/Navbar/Navbar';

const WaitingPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto text-center h-screen align flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Votre commande a bien été pris en compte ! 💃🏼
        </h1>
      </div>
    </>
  );
};

export default WaitingPage;

