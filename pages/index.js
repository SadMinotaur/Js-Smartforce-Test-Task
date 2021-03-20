import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Real Estate App</title>
      </Head>
      <section>
        <h2>Real Estate App</h2>
        <p>
          Here are available <Link href="/listings">listings</Link>.
        </p>
      </section>
    </>
  );
}
