import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DishDefaultImage from '~/assets/layouts/dish-default.png';

const SlideItem = forwardRef(({ data, isPageSlide }, ref) => {
  const navigate = useNavigate();

  const description = isPageSlide
    ? data.businessType
    : `${data.pageData.businessType} - ${data.pageData.name}`;

  const address = isPageSlide
    ? `${data.province}, ${data.district}`
    : `${data.pageData.province}, ${data.pageData.district}`;

  return (
    <div ref={ref} className='mx-2 p-2 bg-white shadow-md'>
      <div className='flex justify-center items-center h-60 object-cover overflow-hidden text-center'>
        <img
          src={
            isPageSlide
              ? data.avatar
                ? data.avatar[0]
                : DishDefaultImage
              : data.images[0] || DishDefaultImage
          }
          className='w-full align-middle mx-auto'
        />
      </div>
      <div className='mt-4 p-2'>
        <h3
          className='mb-2 text-lg cursor-pointer'
          onClick={() => (isPageSlide ? navigate(`/${data._id}`) : undefined)}
        >
          {data.name}
        </h3>
        <p className='mb-0 text-gray-500'>{description}</p>
        <p className='mb-0 text-gray-500 text-xs'>{address}</p>
      </div>
    </div>
  );
});

export default SlideItem;
