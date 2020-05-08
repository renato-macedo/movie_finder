export default function Info({ movie }) {
  return <pre>{JSON.stringify(movie, null, 2)}</pre>;
}
