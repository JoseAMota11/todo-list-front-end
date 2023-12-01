import CardContainer from '../components/CardContainer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center py-4">
        <CardContainer />
      </main>
    </>
  );
}
