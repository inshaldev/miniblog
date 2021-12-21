import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

const Blogs = ({ blogs }) => {
  return (
    <section className={styles.blogs}>
      {blogs.map((blog) => {
        const { title, slug, thumbnail } = blog.fields;
        const { file } = blog.fields.thumbnail.fields;
        const imgSrc = file.url;
        const imgWidth = file.details.image.width;
        const imgHeight = file.details.image.height;

        return (
          <article className={styles.blog} key={blog.sys.id}>
            <Image
              className={styles.blog_thumbnail}
              src={`https:${imgSrc}`}
              width={256}
              height={256}
              alt={blog.title}
            />
            <div className={styles.blog_text}>
              <h3 className={styles.blog_title}>{title}</h3>
              <Link href={`/blogs/${slug}`}>View More</Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Blogs;
