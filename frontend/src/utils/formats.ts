export function truncateTitle(title: string): string {
  if (title.length > 35) {
    return title.slice(0, 35) + "...";
  }
  return title;
}
