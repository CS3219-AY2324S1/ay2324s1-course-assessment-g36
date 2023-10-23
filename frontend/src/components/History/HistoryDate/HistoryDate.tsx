import styles from "./HistoryDate.module.css"

interface IOwnProps {
  date: string
}

export default function HistoryDate({ date }: IOwnProps): JSX.Element {

  function formatDate(date : string): string {
    return new Date(date).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return <span className={styles.date_label}>{ formatDate(date) }</span>
}