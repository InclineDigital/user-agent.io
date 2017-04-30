import Link from 'next/link'

export default ({ua, source, details}) => (
  <section className="jumbotron">
    <div className="container">
      {source ?
        <p className="source">{source}</p>
        : null }
      <h1>
        <Link as={`/ua/${ua}`} href={`/?ua=${ua}`}>
          <a>{ua}</a>
        </Link>
      </h1>
      {details ?
        <p className="details">{details}</p>
        : null }
    </div>
  </section>
)
