import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface Props {
  name: string;
  isActive?: boolean;
  image?: string;
  children: React.ReactNode;
}

function Profile({
  name,
  isActive,
  image = 'https://picsum.photos/200',
  children,
}: Props) {
  return (
    <View style={isActive && styles.activeStyle}>
      <Image source={{uri: image}} style={{width: 200, height: 200}} />
      <Text>{name}</Text>
      <View>{children}</View>
    </View>
  );
}

// Profile.defaultProps = {
//   image: 'https://picsum.photos/200',
// };

const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: 'yellow',
  },
});

export default Profile;
