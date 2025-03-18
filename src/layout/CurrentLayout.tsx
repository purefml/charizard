'use client';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import PublicLayout from './PublicLayout';

/**
 * Returns the current Layout component depending on different circumstances.
 * @layout CurrentLayout
 */
const CurrentLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return <PublicLayout {...props} />;
};

export default CurrentLayout;
