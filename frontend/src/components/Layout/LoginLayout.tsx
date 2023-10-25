import styles from './Layout.module.css'

interface IOwnProps {
  children: JSX.Element | JSX.Element[]
}

export default function LoginLayout({ children }: IOwnProps): JSX.Element {
  return (
    <div className={styles.container}>
      <header className={styles.container_header}>
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </header>
      {children}
    </div>
  )
}
