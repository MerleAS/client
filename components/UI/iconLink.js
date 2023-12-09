"use client";

const IconLink = ({ href, children }) => {
  return <div onClick={() => (window.location.href = href)} className="cursor-pointer">{children}</div>;
};

export default IconLink;
