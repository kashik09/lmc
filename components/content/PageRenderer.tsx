import type { ServicePage, ContentBlock } from '@/content/types';

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={idx} className="mb-4 leading-relaxed">
          {block.text}
        </p>
      );
    case 'heading': {
      const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4';
      const sizes = {
        2: 'text-xl font-semibold mt-6 mb-3',
        3: 'text-lg font-semibold mt-4 mb-2',
        4: 'text-base font-semibold mt-3 mb-2',
      };
      return (
        <Tag key={idx} className={sizes[block.level]}>
          {block.text}
        </Tag>
      );
    }
    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          key={idx}
          className={`mb-4 pl-6 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="mb-1">
              {item}
            </li>
          ))}
        </ListTag>
      );
    }
    case 'image':
      return (
        <figure key={idx} className="my-6">
          <img src={block.src} alt={block.alt} className="w-full rounded" />
          {block.caption && (
            <figcaption className="text-sm text-gray-600 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-gray-300 pl-4 my-6 italic"
        >
          {block.text}
          {block.attribution && (
            <footer className="text-sm mt-2 not-italic">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case 'callout':
      return (
        <div key={idx} className="border p-4 my-4 rounded bg-gray-50">
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

export function PageRenderer({ page }: { page: ServicePage }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
        {page.lede && <p className="text-lg text-gray-700">{page.lede}</p>}
      </header>
      {page.sections.map((section, i) => (
        <section key={i} className="mb-8">
          {section.heading && (
            <h2 className="text-xl font-semibold mb-4">{section.heading}</h2>
          )}
          {section.blocks.map(renderBlock)}
        </section>
      ))}
    </article>
  );
}
