import PageContainer from '../../Components/PageContainer';
import { Typography } from '@material-tailwind/react';
import './index.scss';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';

export default function ForumPage() {
  return (
    <PageContainer>
      <div className="text-center">
        <Typography variant="h3" className="mb-8 font-normal md:font-bold">
          Форум
        </Typography>
        <div className="forum">
          <div className="forum__left">
            <Sidebar />
          </div>
          <div className="forum__right">
            <ChatList />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
