<script>
  import {Router} from '@roxi/routify';
  import {routes} from '../.routify/routes';
  import {FirebaseApp, User, Doc, Collection} from 'sveltefire';
  import firebase from 'firebase/app';
  import firebaseConfig from './env';
  import 'firebase/firestore';
  import 'firebase/auth';
  import 'firebase/storage';
  firebase.initializeApp(firebaseConfig);
</script>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>💪🔥 Mode Activated</h1>

    <p>
      <strong>Tip:</strong>
      Open the browser console for development logging.
    </p>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      Howdy 😀! User
      <em>{user.uid}</em>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">
        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>
      </div>

      <hr />

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
        <h2>{post.title}</h2>

        <p>
          Document created at <em
            >{new Date(post.createdAt).toLocaleString()}</em
          >
        </p>

        <span slot="loading">Loading post...</span>
        <span slot="fallback">
          <button
            on:click={() =>
              postRef.set({
                title: '📜 I like Svelte',
                createdAt: Date.now()
              })}
          >
            Create Document
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->

        <h3>Comments</h3>
        <Collection
          path={postRef.collection('comments')}
          query={ref => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log
        >
          {#if !comments.length}
            No comments yet...
          {/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </p>
          {/each}

          <button
            on:click={() =>
              commentsRef.add({
                text: '💬 Me too!',
                createdAt: Date.now()
              })}
          >
            Add Comment
          </button>

          <span slot="loading">Loading comments...</span>
        </Collection>
      </Doc>
    </User>
  </FirebaseApp>
</main>
<Router {routes} />

<style @global>
</style>
