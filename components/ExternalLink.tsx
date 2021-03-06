import React, { FC, HTMLProps } from "react";

export interface ExternalLinkProps extends HTMLProps<HTMLAnchorElement> {
}

const ExternalLink: FC<ExternalLinkProps> = ({ children, ...props }) => {
  return (
    <a {...props} target="_blank" rel="noreferrer noopener" className="text-primary">{children}</a>
  );
};

export default ExternalLink;
