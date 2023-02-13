import PageLayout from '@/components/page-layout';
import UserInput from '@/components/user_input-page/User_input';

import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <PageLayout
      title='user_input'
      description='Discover a starter kit which includes Next.js, Chakra-UI, Framer-Motion in Typescript. You have few components, Internationalization, SEO and more in this template ! Enjoy coding.'
    >
      <UserInput />

    </PageLayout>
    </> 
    
 
  );
};

export default IndexPage;
