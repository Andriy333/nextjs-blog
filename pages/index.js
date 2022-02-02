import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import { getSortedPostsData } from '../lib/posts';
import useSWR from 'swr';
import Post from './posts/[id]';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  // const { user, isLoading, isError } = Profile()

  return (
    <>
      <Layout home>
        {/* Keep the existing code here */}

        {/* Add this <section> tag below the existing <section> tag */}
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog 2</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}

const getData = async () => {
  const response = await fetch("https://reqres.in/api/products/");
  return await response.json();
};

function Profile() {
  const { data, error } = useSWR('https://reqres.in/api/products/', getData);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
