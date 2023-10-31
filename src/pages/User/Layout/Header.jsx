import LogoDark from '~/assets/image/Kios/Kios_dark.png';
import { AiFillShopping } from 'react-icons/ai';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import useThemeSwitcher from '~/hooks/useThemeSwitcher';
import { Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Cart from '../Cart/Cart';
import Container from '~/components/Container';

const Header = ({ handleSubmitOrder }) => {
  const [activeTheme, setTheme] = useThemeSwitcher();
  const { quantity } = useSelector(state => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsToRemove = ['cartItems', 'quantity', 'totalAmount'];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    handleSubmitOrder();
    itemsToRemove.forEach(item => {
      localStorage.removeItem(item);
    });
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className='fixed top-0 left-0 w-full h-16 md:h-20 leading-1 bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-xl z-10'>
        <div className='ct-client-page-container flex justify-between items-center'>
          <div className='flex items-center gap-10'>
            <img className='2xl:w-16 ssm:w-10' src={LogoDark} />
            <h1 className='text-2xl md:text-[2rem] font-dancing sm:block ssm:hidden'>
              Chọn đi chờ chi !
            </h1>
          </div>
          <div className='flex gap-6'>
            <button
              onClick={() => setTheme(activeTheme)}
              className='bg-transparent hover:cursor-pointer'
            >
              {activeTheme === 'dark' ? (
                <BsSun className='w-6 h-6 hover:text-black' />
              ) : (
                <BsMoonStars className='w-6 h-6 hover:text-black' />
              )}
            </button>
            <button
              onClick={showModal}
              className='w-12 h-12 rounded-xl bg-ternary-dark flex flex-col justify-center items-center hover:cursor-pointer hover:bg-[#8B4513] duration-500'
            >
              <div className=' relative'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <p className='text-black dark:text-white font-bold font-sans p- m-0 duration-500'>
                    {quantity}
                  </p>
                </div>
                <AiFillShopping className='w-9 h-auto dark:text-black duration-500' />
              </div>
            </button>
          </div>
        </div>
      </header>
      <Modal title='ĐƠN ĐẶT MÓN' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Cart />
        </div>
      </Modal>
    </>
  );
};

export default Header;
