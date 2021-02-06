import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ posts, date }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((n) => n + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Next.js base</title>
      </Head>
      <h1>
        Count : {count} - {date}
      </h1>
      <ul>
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`}>
            <a>
              <li>
                <h3>
                  {post.id} - {post.title}
                </h3>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const posts = await fetch(
    'http://jsonplaceholder.typicode.com/posts?_limit=4'
  ).then((r) => r.json());
  return {
    props: {
      posts,
      date: new Date().toString(),
    },
    revalidate: 5,
  };
}
