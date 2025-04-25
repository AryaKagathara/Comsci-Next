// components/Breadcrumb.js
import Link from 'next/link';

const SeparatorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    className="breadcrumb-separator-icon" // Use CSS class for the icon
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
  >
    <path
      fill="none"
      stroke="currentColor" // Color will be inherited from CSS
      strokeWidth="4"
      d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"
    ></path>
  </svg>
);

export default function Breadcrumb({ items = [], className = '' }) {

  if (!items || items.length <= 1) {
    return null;
  }

  // Combine base class with user-provided classes
  const navClassName = `breadcrumb-nav ${className}`.trim();

  return (
    <nav aria-label="Breadcrumb" className={navClassName}>
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          // Determine if the current item is the last one
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || item.name} className="breadcrumb-items">
              {/* Separator logic remains the same */}
              {index > 0 && (
                <span><SeparatorIcon/></span>
              )}

              {/* NEW LOGIC: Render as Link if href exists, otherwise as plain text */}
              {item.href ? (
                // Render as a Link if href is provided
                <Link
                  href={item.href}
                  className="breadcrumb-link"
                  // Add aria-current if it's the last item being linked
                  aria-current={isLast ? "page" : undefined}
                >
                  {/* Choose text style based on whether it's the last item */}
                  <p className="breadcrumb-link-text">
                    {item.name}
                  </p>
                </Link>
              ) : (
                // Render as plain text if no href is provided
                // (Typically only happens for the last item if you omit its href)
                <p className="breadcrumb-link-text" aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}