import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Button, Modal, Tabs, message } from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import MenuContentForm from './FormParts/MenuContentForm';
import MenuDesignForm from './FormParts/MenuDesignForm';
import MenusAPI from '~/services/menuAPI';
import { reloadPage } from '~/redux/page/pageSlice';
import { applyMenu } from '~/redux/page/pageActions';
import { unselectAll } from '~/redux/menu/menuSlice';

const MenuForm = ({ isModalOpen, handleCancel, handleReload }) => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const { menuContent, itemList } = useSelector(state => state.menu);
  const [applyMenuId, setApplyMenuId] = useState(null);
  const [isApplyMenu, setIsApplyMenu] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const MESSAGE_KEY = useId();

  const handleSaveMenu = async value => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang lưu thực đơn...' });
    const priceAverage = itemList.reduce((sum, item) => sum + item.price, 0) / itemList.length;
    const menuContentData = {
      name: value.name,
      userId: currentUser._id,
      pageId: activePage._id,
      priceAverage,
      dishQuantity: itemList.length,
      content: menuContent
    };
    try {
      const response = await MenusAPI.create(menuContentData);
      setApplyMenuId(response.data.createdMenuId);

      handleCancel();
      handleReload();
      form.resetFields();
      dispatch(unselectAll());
      message.success({ key: MESSAGE_KEY, content: 'Đã lưu thực đơn' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    const handleApplyMenu = async () => {
      if (!applyMenuId || !isApplyMenu) return;
      const payload = {
        id: activePage._id,
        data: { menuId: applyMenuId }
      };
      await dispatch(applyMenu(payload));
      dispatch(reloadPage());
      setApplyMenuId(null);
      setIsApplyMenu(false);
      message.destroy(MESSAGE_KEY);
      message.success({ key: MESSAGE_KEY, content: 'Áp dụng thực đơn thành công' });
    };
    handleApplyMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyMenuId, isApplyMenu]);

  const handleSaveAndApplyMenu = () => {
    form.submit();
    setIsApplyMenu(true);
  };

  const items = [
    {
      key: '1',
      label: 'Chọn món',
      children: <MenuContentForm form={form} onFinish={handleSaveMenu} />
    },
    {
      key: '2',
      label: 'Thiết kế',
      children: <MenuDesignForm />
    }
  ];

  const buttonGroup = (
    <div className='flex gap-1'>
      <Button key='save' icon={<SaveOutlined />} type='primary' onClick={() => form.submit()}>
        Lưu
      </Button>
      <Button key='apply' icon={<CheckOutlined />} type='primary' onClick={handleSaveAndApplyMenu}>
        Lưu và áp dụng
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        title='TẠO THỰC ĐƠN MỚI'
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width='70%'
        className='min-w-[1180px]'
        footer={false}
      >
        <Tabs defaultActiveKey='1' items={items} type='card' tabBarExtraContent={buttonGroup} />
      </Modal>
    </>
  );
};

export default MenuForm;
