import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';
import usePosts from '../hooks/usePosts';
import {useUserContext} from '../contexts/UserContext';
import events from '../lib/events';

function Profile({userId}) {
  const [user, setUser] = useState(null);
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} =
    usePosts(userId);

  const {user: me} = useUserContext();
  const isMyProfile = me.id === userId;

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  // useEffect(() => {
  //   // 자신의 프로필을 보고 있을 때만 새 포스트 작성 후 새로고침합니다.
  //   if (!isMyProfile) {
  //     return;
  //   }
  //   events.addListener('refresh', onRefresh);
  //   events.addListener('removePost', removePost);
  //   return () => {
  //     events.removeListener('refresh', onRefresh);
  //     events.removeListener('removePost', removePost);
  //   };
  // }, [isMyProfile, onRefresh, removePost]);

  if (!user || !posts) {
    // posts 가 없을 수도 있는 것 아닌가? array 가 온다는 것인가.
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});

export default Profile;
