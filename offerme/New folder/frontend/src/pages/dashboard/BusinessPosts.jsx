import { useState } from 'react'
import PostForm from '@/components/dashboard/PostForm'
import styles from './BusinessPosts.module.css'

export default function BusinessPosts() {
  const [showForm, setShowForm] = useState(false)
  const [posts, setPosts] = useState([])

  const handleSubmit = (data) => {
    const newPost = {
      id: Date.now().toString(),
      ...data,
      status: 'pending',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => [newPost, ...prev])
    setShowForm(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Posts</h1>
        <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Create New Post</h2>
          <PostForm onSubmit={handleSubmit} />
        </div>
      )}

      <div className={styles.postList}>
        {posts.length === 0 && !showForm && (
          <div className={styles.empty}>
            <p>No posts yet. Create your first post to start reaching customers.</p>
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.postHeader}>
              <h3>{post.shopName}</h3>
              <span className={`${styles.status} ${styles[post.status]}`}>{post.status}</span>
            </div>
            <p className={styles.postCategory}>{post.category}</p>
            <p className={styles.postDesc}>{post.description}</p>
            <div className={styles.postMeta}>
              <span>👁️ {post.views}</span>
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
