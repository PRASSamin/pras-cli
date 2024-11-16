import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const PrevNextPathname = (currentPathname, data) => {
  let prev = null;
  let next = null;

  for (let sectionIndex = 0; sectionIndex < data.length; sectionIndex++) {
    const section = data[sectionIndex];

    for (let i = 0; i < section.items.length; i++) {
      const item = section.items[i];

      // Check if the current item matches the current pathname
      if (item.pathname === currentPathname) {
        // Set the previous item if it's not the first in the list
        if (i > 0) {
          prev = section.items[i - 1];
        } else {
          // If it's the first item in the current section, check the previous section for the last item
          const prevSection = data[sectionIndex - 1];
          if (prevSection && prevSection.items.length > 0) {
            prev = prevSection.items[prevSection.items.length - 1];
          }
        }

        // Set the next item if it's not the last in the list
        if (i < section.items.length - 1) {
          next = section.items[i + 1];
        } else {
          // If it's the last item in the current section, check the next section for the first item
          const nextSection = data[sectionIndex + 1];
          if (nextSection && nextSection.items.length > 0) {
            next = nextSection.items[0];
          }
        }

        break; // Break once the current pathname is found
      }
    }

    // If we found the current pathname, break out of the outer loop as well
    if (prev !== null || next !== null) {
      break;
    }
  }

  return { prev, next };
};

export const handleIDClick = (id) => {
  const yOffset = -70;
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

export const getAllIds = (root) => {
  // Recursive function to find IDs
  function collectIds(element) {
    const ids = [];

    // Traverse child elements
    for (const child of element.children) {
      if (child.id) {
        // If the element has children with IDs, create a nested structure
        const nestedIds = collectIds(child);
        if (child.getAttribute("data-id-name")) {
        ids.push({
          id: child.id,
          title: child.getAttribute("data-id-name"),
          children: nestedIds.length > 0 ? nestedIds : null,
        });
      }
      } else {
        // Traverse children that don't have an id themselves but might have children with ids
        const nestedIds = collectIds(child);
        ids.push(...nestedIds);
      }
    }

    return ids;
  }

  // Start collection from the root element
  return collectIds(root);
};
