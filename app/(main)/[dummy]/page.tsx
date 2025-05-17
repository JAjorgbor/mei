export const runtime = 'edge'

export default function Page({ params }: { params: { dummy: string } }) {
  return (
    <div>
      hello, slug: <strong>{params.dummy}</strong>
    </div>
  )
}
