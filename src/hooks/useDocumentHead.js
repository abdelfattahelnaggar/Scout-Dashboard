import { useEffect } from "react";

/**
 * Custom hook to manage document head (title and meta tags)
 * @param {Object} options - Configuration object
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} options.keywords - Meta keywords
 * @param {Object} options.meta - Additional meta tags as key-value pairs
 */
export function useDocumentHead({ title, description, keywords, meta = {} }) {
  useEffect(() => {
    // Store original values
    const originalTitle = document.title;
    const metaTags = [];

    // Set title
    if (title) {
      document.title = title;
    }

    // Set description
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement("meta");
        descMeta.name = "description";
        document.head.appendChild(descMeta);
        metaTags.push(descMeta);
      }
      descMeta.content = description;
    }

    // Set keywords
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.name = "keywords";
        document.head.appendChild(keywordsMeta);
        metaTags.push(keywordsMeta);
      }
      keywordsMeta.content = keywords;
    }

    // Set additional meta tags
    Object.entries(meta).forEach(([name, content]) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = name;
        document.head.appendChild(metaTag);
        metaTags.push(metaTag);
      }
      metaTag.content = content;
    });

    // Cleanup function
    return () => {
      document.title = originalTitle;
      // Remove created meta tags
      metaTags.forEach((tag) => {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, [title, description, keywords, meta]);
}

