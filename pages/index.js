import { createClient } from 'contentful';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Blogs from '../components/Blogs';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_APP_SPACE,
    accessToken: process.env.CONTENTFUL_APP_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: 'blog' });

  return {
    props: {
      blogs: res.items,
    },
  };
};

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <div className={styles.container}>
      <Head>
        <title>Miniblogs - Share it brooo!</title>
      </Head>

      <main className={styles.main}>
        <h1>Blogs</h1>

        <Blogs blogs={blogs} />
      </main>
    </div>
  );
}
