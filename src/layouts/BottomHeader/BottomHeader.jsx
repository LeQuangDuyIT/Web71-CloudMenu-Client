import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import {
  HomeOutlined,
  BarsOutlined,
  BookOutlined,
  FileDoneOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import Container from '~/components/Container';

const BottomHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-orange-500'>
      <Container>
        <div className='flex justify-between items-center h-11'>
          <Space wrap>
            <Button type='text' icon={<HomeOutlined />} style={{ color: 'white' }}>
              Bảng tin
            </Button>
            <Button
              type='text'
              icon={<BarsOutlined />}
              style={{ color: 'white' }}
              onClick={() => navigate('/p/lqduycp/dish')}
            >
              Món ăn
            </Button>
            <Button
              type='text'
              icon={<BookOutlined />}
              style={{ color: 'white' }}
              onClick={() => navigate('/p/lqduycp/menu')}
            >
              Thực đơn
            </Button>
            <Button type='text' icon={<FileDoneOutlined />} style={{ color: 'white' }}>
              Gọi món
            </Button>
            <Button type='text' icon={<LineChartOutlined />} style={{ color: 'white' }}>
              Thống kê
            </Button>
          </Space>
          <Space wrap></Space>
        </div>
      </Container>
    </div>
  );
};

export default BottomHeader;
