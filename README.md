# remark-underline


This Remark plugin converts custom syntax `,,,text,,,` into underlined text, which now supports other Markdown formats inside (like bold and italic).

SYNTAX:
* This is text ,,,that is underlined,,,.
* This is text ,,,**bold and underlined**,,,
* This is text ,,,*italic and underlined*,,,.

HTML RESULT:
* This is text <u>that is underlined</u>.
* This is text <u><strong>bold and underlined</strong></u>.
* This is text <u><em>italic and underlined</em></u>.
