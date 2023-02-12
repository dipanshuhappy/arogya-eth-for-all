import FeaturesPage from '@/components/index-page/features_page';
import StartingPage from '@/components/index-page/starting_page';
import PageLayout from '@/components/page-layout';
import UserRecords from '@/components/User_Record-Page/UserRecords';

import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <PageLayout
      title='user_record'
      description='Discover a starter kit which includes Next.js, Chakra-UI, Framer-Motion in Typescript. You have few components, Internationalization, SEO and more in this template ! Enjoy coding.'
    >
      <UserRecords />

    </PageLayout>
    </> 
    
 
  );
};

export default IndexPage;