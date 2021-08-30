<script>
  import {Router} from '@roxi/routify';
  import {routes} from '../.routify/routes';
  import {FirebaseApp, User, Doc, Collection} from 'sveltefire';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import {onMount} from 'svelte';
  import firebaseConfig from './env';
  import authStore from './store/stores.ts';

  onMount(() => {
    if (firebase.apps.length == 0) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => {
      authStore.set({
        isLoggedIn: user !== null,
        user,
        firebaseControlled: true
      });
    });
  });
</script>

<FirebaseApp {firebase}>
  <User let:auth let:user>
    <button on:click={() => console.log($authStore.user.uid)}>test</button>
    <Router {routes} />
  </User>
</FirebaseApp>

<style @global>
</style>
