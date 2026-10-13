// src/utils/remark-underline.mjs

import { visit } from 'unist-util-visit';

/**
 * This Remark plugin converts custom syntax `,,,text,,,` into underlined text,
 * which now supports other Markdown formats inside (like bold and italic).
 *
 * SYNTAX:
 *   This is text ,,,that is underlined,,,.
 *   This is text ,,,**bold and underlined**,,,
 *   This is text ,,,*italic and underlined*,,,.
 *
 * HTML RESULT:
 *   This is text <u>that is underlined</u>.
 *   This is text <u><strong>bold and underlined</strong></u>.
 *   This is text <u><em>italic and underlined</em></u>.
 */
export default function remarkUnderline() {
  return (tree) => {
    // Visit every paragraph node
    visit(tree, 'paragraph', (paragraphNode) => {
      const newChildren = [];
      let isUnderlining = false;          // Toggle state for underline mode
      let underlineNodes = [];            // Temporary container for nodes to be underlined

      // Iterate through every child (text, bold, italic, etc.) of the paragraph
      for (const child of paragraphNode.children) {
        // If the node is not text or does not contain ',,,', process as usual
        if (child.type !== 'text' || child.value.indexOf(',,,') === -1) {
          if (isUnderlining) {
            // If in underline mode, collect these nodes
            underlineNodes.push(child);
          } else {
            // Otherwise, add them directly to the final result
            newChildren.push(child);
          }
          continue;
        }

        // This is a text node containing ',,,' – split it by the marker
        const parts = child.value.split(',,,');

        parts.forEach((part, index) => {
          // Add the text part if it's not empty
          if (part) {
            const textNode = { type: 'text', value: part };
            if (isUnderlining) {
              underlineNodes.push(textNode);
            } else {
              newChildren.push(textNode);
            }
          }

          // Each marker (except at the end of the string) toggles the state
          if (index < parts.length - 1) {
            isUnderlining = !isUnderlining;

            // If state turns from ON to OFF, we close the underline group
            if (!isUnderlining && underlineNodes.length > 0) {
              // Wrap all collected nodes with <u> tags – push directly
              newChildren.push({ type: 'html', value: '<u>' });
              newChildren.push(...underlineNodes);
              newChildren.push({ type: 'html', value: '</u>' });
              underlineNodes = []; // Reset the container
            }
          }
        });
      }

      // If the loop finishes with leftover nodes (unclosed ',,,' marker),
      // output them as plain text without underlining.
      if (underlineNodes.length > 0) {
        newChildren.push({ type: 'text', value: ',,,' });
        newChildren.push(...underlineNodes);
      }

      // Replace the old paragraph children with the processed ones
      paragraphNode.children = newChildren;
    });
  };
}
