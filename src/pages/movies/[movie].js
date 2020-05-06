import { useRouter } from 'next/router';
export default function Movie() {
  const { query } = useRouter();

  return <h3>{query.movie}</h3>;
}
