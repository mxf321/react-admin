import React from 'react';
import PrivateRoute from './privateRoute';
import { LazyLoad } from '@/components';
import KeepAlive from 'react-activation';

export interface WrapperRouteProps {
  auth?: boolean;
  title?: string;
  children?: JSX.Element
}

const WrapperRouteComponent: React.FC<WrapperRouteProps> = ({ auth, title, children }) => {

  if (auth) {
    return <LazyLoad><PrivateRoute title={title}>{children}</PrivateRoute></LazyLoad>;
  }
  return <LazyLoad><KeepAlive id={title}>{children}</KeepAlive></LazyLoad>;
};

export default WrapperRouteComponent;
