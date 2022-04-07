import Layout from 'components/Layout';
import type { NextPage } from 'next';
import styles from 'styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout type="post" title="creddit">
      <div className={styles.container}>홈</div>
    </Layout>
  );
};

export default Home;
