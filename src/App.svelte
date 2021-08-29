<script lang="typescript">
  import {Router} from '@roxi/routify';
  import {routes} from '../.routify/routes';
  import {userbaseStore, userStore, promiseStore} from '@store/stores';
  const userbase = window.userbase;
  window.userbase = null;

  $userbaseStore = userbase;
  $userStore = null;

  $promiseStore = userbase
    .init({appId: '6cfe0252-01b3-4d20-ada2-3afaf71ac928'})
    .then(session => ($userStore = session.user));

  function signout() {
    $promiseStore = $userbaseStore.signOut().then(() => ($userStore = null));
  }
</script>

<div
  class="container flex flex-col justify-center items-center w-screen h-screen mx-auto"
>
  {#await $promiseStore.then(() => Promise.reject())}
    Loading..
  {:catch error}
    {#if error}
      <strong class="text-red-700 font-bold">ERROR! {error} </strong>
    {/if}
    {#if $userStore}
      Hello, {$userStore.username}!
      <button on:click={signout}>Logout</button>
    {:else}
      <h1>Welcome to THE BEST WAY TO learn SNOWBOARDING</h1>
      <Router {routes} />
    {/if}
  {/await}
</div>

<style @global>
</style>
