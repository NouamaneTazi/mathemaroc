import * as React from 'react';

import { Avatar, Box, FlexProps, Skeleton, SkeletonCircle, SkeletonText, Text, WrapItem } from '@chakra-ui/react'

interface MemberCardProps extends FlexProps {
  member: any;
}
export const MemberCard: React.FC<MemberCardProps> = (props) => {
  const { member} = props;
  const style_ = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  if (!member.image) {
    member.image = {
      url: "https://bit.ly/broken-link"
  }}
  return (
    <>

      {/* <div padding='6' boxShadow='lg' bg='white' maxW='sm' borderRadius='lg' overflow='hidden' > */}
      <div>
        <div style={style_}>
          <Avatar size='2xl' src={member.image.url} >
          </Avatar>{' '}
        </div>
        <div style={style_}>
          <Text fontSize="sm" fontWeight="bold" color='#686c6e'>
            {member.name}
          </Text>
        </div>
        <div style={style_}>
          <Text fontSize="sm" fontWeight="bold" color='#90cdf4'>
            {member.role}
          </Text>
        </div>
      </div>
      <div style={{ width: 50, height: 50 }}></div>
      
    </>
  );
}