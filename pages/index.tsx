import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <div className={styles.container}>
      <Head>
        <title>Taste Lynx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session && <>
          Not signed in <br/>
          <button onClick={() => signIn("spotify")}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.user.email} <br/>
          <button onClick={() => signOut()}>Sign out</button>
        </>}

        <h1 className={styles.title}>
          You've got great taste. Ensure it stays up to date.
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
