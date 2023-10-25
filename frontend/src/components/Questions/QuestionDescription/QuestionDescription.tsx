interface IOwnProps {
  description: string;
}

export default function QuestionDescription({ description }: IOwnProps): JSX.Element {
  return (
    <span>
      {description
        .split('\n')
        .map((desc, idx) => <p key={idx}>{desc}<br /></p>)
      }
    </span>
  )
}