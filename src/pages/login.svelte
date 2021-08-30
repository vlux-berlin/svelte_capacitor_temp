<script>
  import {FirebaseApp, User, Doc, Collection} from 'sveltefire';
  export let auth;
  export let user;
  import firebase from 'firebase/app';
  import authStore from '../store/stores.ts';
  async function loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<em>{$authStore.user.uid}</em>
<button on:click={loginWithGoogle}>google</button>
<button on:click={firebase.auth().signInAnonymously()}>
  Sign In Anonymously
</button>
