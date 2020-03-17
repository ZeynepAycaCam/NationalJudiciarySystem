import React from 'react';
import { Link, Title } from '@/components/ui';
import PublicLayout from '@/components/layouts/publicLayout';

class Error extends React.Component {
  render() {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center">
        <Title type="h1" extraClassName="mb-24">
          404 Page Not Found!
        </Title>

        <Link url="/">
          <Title type="h3">Home Page</Title>
        </Link>
      </div >
    );
  }
}

export default PublicLayout(Error);
