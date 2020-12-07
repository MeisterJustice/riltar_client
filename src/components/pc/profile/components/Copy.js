import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Copy = (props) => {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <span>
      {copied ? (
        <span style={{ color: "#0077be", fontSize: 12 }}>copied</span>
      ) : (
        <CopyToClipboard text={props.text} onCopy={copy}>
          <span
            className="cursor"
            style={{ color: "#0077be", fontSize: 12, marginLeft: "3px" }}
          >
            copy
          </span>
        </CopyToClipboard>
      )}
    </span>
  );
};

export default Copy;
