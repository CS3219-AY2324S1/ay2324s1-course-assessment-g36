import Header from '../Header/Header'
import styles from './Layout.module.css'

interface IOwnProps {
  children: JSX.Element | JSX.Element[]
}

export default function Layout({ children }: IOwnProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}
