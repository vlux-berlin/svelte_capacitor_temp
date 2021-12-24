<script>
  import {FirebaseApp, User, Doc, Collection} from 'sveltefire';
  import firebase from 'firebase/app';
  import authStore from '../store/stores.ts';
  import 'firebase/firestore';
</script>

<Doc
  path={`posts/${$authStore.user.uid}`}
  let:data={post}
  let:ref={postRef}
  log
>
  <h2>{post.title}</h2>
  <p>
    Document created at <em>{new Date(post.createdAt).toLocaleString()}</em>
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
      <p />
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
