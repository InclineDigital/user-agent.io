import Link from 'next/link';

export default function UA({ ua, source, detail, link = true }) {
  return (
    <section className="jumbotron">
      <div className="container">
        {source ? <p className="source">{source}</p> : null}
        <h1>
          {link
            ? <Link as={`/ua/${ua}`} href={`/?ua=${ua}`}>
                <a>{ua}</a>
              </Link>
            : ua}
        </h1>
        {detail ? <p className="details">{detail}</p> : null}
      </div>
    </section>
  );
}
