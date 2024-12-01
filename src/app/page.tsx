import Head from 'next/head'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Babel UI</title>
        <meta name="description" content="Babel UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Chat />
      </main>
    </div>
  )
}

export default Home
