import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { createClient } from 'contentful';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';

const client = createClient({
  space: process.env.NEXT_APP_SPACE,
  accessToken: process.env.NEXT_APP_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'blog' });

  const paths = response.items.map((blog) => {
    return {
      params: { slug: blog.fields.slug },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'blog',
    'fields.slug': params.slug,
  });

  return {
    props: {
      blogData: items[0],
    },
  };
};

const BlogDetails = ({ blogData }) => {
  const { title, slug, thumbnail, content } = blogData.fields;
  const { file } = blogData.fields.thumbnail.fields;
  const imgSrc = file.url;
  const imgWidth = file.details.image.width;
  const imgHeight = file.details.image.height;
  return (
    <>
      <Head>
        <title>{title} - Miniblog</title>
      </Head>
      <div className={styles.blog_details}>
        <Image
          className={styles.blog_details_thumbnail}
          src={`https:${imgSrc}`}
          width={350}
          height={350}
          alt={title}
        />
        <div className={styles.blog_details_text}>
          <Link href="../">Go back</Link>
          <h3 className={styles.blog_details_title}>{title}</h3>
          <div className={styles.blog_details_content}>
            {documentToReactComponents(content)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
