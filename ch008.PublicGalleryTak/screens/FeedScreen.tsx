import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';
import events from '../lib/events';

function FeedScreen() {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} =
    usePosts();

  // useEffect(() => {
  //   events.addListener('refresh', onRefresh);
  //   events.addListener('removePost', removePost);
  //   return () => {
  //     events.removeListener('refresh', onRefresh);
  //     events.removeListener('removePost', removePost);
  //   };
  // }, [onRefresh, removePost]);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore} // 즉 끝이 닿으면 실행하는 함수를 지정해 주는군.
      onEndReachedThreshold={0.75} // 여기에 75% 정도 밑이라면 이군. 위로 갈 때 사라지는 것이 없는 단방향 이군.
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            styles={styles.spinner}
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

const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});

export default FeedScreen;
