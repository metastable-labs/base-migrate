import React from 'react';

const Base64ToSvg = ({ base64String }: { base64String: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<img src=${base64String} alt="SVG" />`,
      }}
    />
  );
};

export default Base64ToSvg;
