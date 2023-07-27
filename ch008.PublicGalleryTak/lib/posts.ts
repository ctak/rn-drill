import firestore from '@react-native-firebase/firestore';

export const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 12;

export async function getPosts(userId) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId); // query 의 값이 변경되는 군!
  }
  const snapshot = await query.get();

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getOlderPosts(id, userId) {
  const cursorDoc = await postsCollection.doc(id).get(); // cursorDoc

  let query = postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId); // query 의 값이 변경되는 군!
  }
  
  const snapshot = await query.get();

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getNewerPosts(id, userId) {
  const cursorDoc = await postsCollection.doc(id).get(); // cursorDoc

  let query = postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);
  
  if (userId) {
    query = query.where('user.id', '==', userId); // query 의 값이 변경되는 군!
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function removePost(id) {
  return postsCollection.doc(id).delete();
}

export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
