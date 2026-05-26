import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/auth.module.css'
import { login } from '../../lib/authHelpers'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: loginError } = await login(
        formData.email,
        formData.password
      )

      if (loginError) {
        setError(loginError)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - SwingRank</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>🏌️ Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your SwingRank account</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.footer}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className={styles.link}
            >
              Sign Up
            </button>
          </div>

          <div className={styles.forgotPassword}>
            <button
              type="button"
              onClick={() => router.push('/auth/forgot-password')}
              className={styles.link}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
