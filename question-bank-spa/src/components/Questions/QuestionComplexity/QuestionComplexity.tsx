import styles from "./QuestionComplexty.module.css"

interface IOwnProps {
  complexity: string
}

export default function QuestionComplexity({ complexity }: IOwnProps): JSX.Element {
  if (complexity === "Easy") {
    return <span className={styles.easy_label}>{ complexity }</span>
  }
  if (complexity === "Medium") {
    return <span className={styles.medium_label}>{ complexity }</span>
  }
  return <span className={styles.hard_label}>{ complexity }</span>
}