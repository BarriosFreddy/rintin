import React from "react";
import "../assets/styles/containers/Post.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const content = `# An awesome headline about some topic

## Description

--- 

* Item

* [x] check

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x]  done

A table:

| a | b |
| - | - |

\`\`\`
// Some code

var x = 1;
\`\`\`
`;
const Post = ({ match: { params } }) => {
  return (
    <section className="post">
      <ReactMarkdown plugins={[gfm]} children={content} />
    </section>
  );
};

export default Post;
