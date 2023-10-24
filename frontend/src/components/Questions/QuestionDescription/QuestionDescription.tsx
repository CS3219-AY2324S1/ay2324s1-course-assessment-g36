interface IOwnProps {
  description: string;
}

export default function QuestionDescription({ description }: IOwnProps): JSX.Element {
  return (
    <span>
      {description
        .split('\n')
        .map(desc => <p key={desc}>{desc}<br /></p>)
      }
    </span>
  )
}