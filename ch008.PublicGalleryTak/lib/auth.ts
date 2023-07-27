import auth from '@react-native-firebase/auth';

// 전에 MosignTaxi 에서도 여러가지 방식으로 로그인 되게 했었지. email/password 해도 인증까지 했었던 같어.
export function signIn({email, password}) { // 이렇게 객체를 받는 것이 파라미터 순서와 상관이 없으니 더 좋은것 같아...
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) { // 진짜 구독하는 것이네.
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  return auth().signOut();
}
