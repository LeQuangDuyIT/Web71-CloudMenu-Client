import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = ({ children, className }) => {
  return (
    <div
      className={classNames('w-full 2xl:max-w-screen-2xl lg:px-[5%] 2xl:px-0 mx-auto', {
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Container;
