class Block extends React.Component {
  render() {
    return (
      <div className="heading">
        <h2 className="h2">{this.props.heading}</h2>
        <button
          onClick={this.props.handleSize}
          title={
            this.props.size
              ? `Minimize ${this.props.heading}`
              : `Maximize ${this.props.heading}`
          }
        >
          {this.props.size ? "-" : "+"}
        </button>
        {this.props.heading == "Editor" ? (
          <button onClick={this.props.clearAll}>Clear</button>
        ) : (
          <select value={this.props.select} onChange={this.props.handleSelect}>
            <option value="text">Text</option>
            <option value="html">HTML</option>
          </select>
        )}
      </div>
    );
  }
}
class Editor extends React.Component {
  render() {
    return (
      <textarea
        onChange={this.props.handleChange}
        id="editor"
        value={this.props.value}
      />
    );
  }
}
class Preview extends React.Component {
  render() {
    return (
      <div>
        {this.props.select == "text" ? (
          <div
            id="preview"
            className="preview"
            dangerouslySetInnerHTML={{ __html: this.props.preview }}
          />
        ) : (
          <div id="preview" className="preview">
            {this.props.preview}
          </div>
        )}
      </div>
    );
  }
}

marked.setOptions({
  breaks: true
});
marked.Renderer.prototype.link = (href, title, text) =>
  `<a title="${title ? title : ""}" target="_blank" href="${href}">${text}</a>`;
let v = `# Marked in the browser\n\n## Example of sub-header\n\n### And third header\n\nAnother ways to make headings:\n1. Using three or more equals signs on a line under a heading.\n2. Three or more hyphens under a line.
---
Here is a simple paragraph. You need to have a blank line between chunks of text.\n\n__More complex__ *paragraph* with **_bold and cursive_** text.\n\nAlso you can use different ways to give links:\n\n* [freeCodeCamp](https://freecodecamp.org/ "Learn to code for free!")\n+ [Marked.js] [1]\nBrowsers in a nested list:\n- [Yandex](https://yandex.fr)\n* <http://www.google.com>
[1]: https://github.com/markedjs/marked (markdown compiler)
___
Horizintal rule and code \`<hr/><p>Example of js code below.</p><code>alert("inline code");</code> \` 
\`\`\`
<code>var a = 5; 
function square(num) { 
return num*num;
}</code>
\`\`\`
    <h2>Preformatted text.</h2>    <p>Here you 
    can write examples of html or
    markdown code.</p>  And    also
    can use         multiple spaces.
***
> This text is a block quote. And below is image (\`<img />\`) with \`title\` and \`alt\` attributes.\n\n![JavaScript](http://eti.ng/media/catalog/product/cache/1/image/4fef9342bdc3af4069fc01babcacfe90/1/3/133_1.png "JavaScript")`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: v,
      preview: marked(v),
      edSize: false,
      prSize: false,
      select: "text"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdSize = this.handleEdSize.bind(this);
    this.handlePrSize = this.handlePrSize.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleChange(e) {
    this.setState({
      value: e.target.value,
      preview: marked(e.target.value)
    });
  }
  handleEdSize(e) {
    var div = e.target.parentNode.parentNode;
    if (this.state.edSize) {
      div.classList.remove("max-size");
      document.querySelector("textarea").classList.remove("max-text");
    } else {
      div.classList.add("max-size");
      document.querySelector("textarea").classList.add("max-text");
    }
    this.setState({
      edSize: !this.state.edSize
    });
  }
  handlePrSize(e) {
    var div = e.target.parentNode.parentNode;
    if (this.state.prSize) {
      div.classList.remove("max-size");
      document.querySelector("#preview").classList.remove("max-text");
    } else {
      div.classList.add("max-size");
      document.querySelector("#preview").classList.add("max-text");
    }
    this.setState({
      prSize: !this.state.prSize
    });
  }
  clearAll(e) {
    this.setState({
      value: "",
      preview: ""
    });
  }
  handleSelect(e) {
    this.setState({
      select: e.target.value
    });
  }
  render() {
    return (
      <div>
        <h1 className="h1">Markdown Editor and Previewer</h1>
        <section>
          <Block
            heading="Editor"
            handleSize={this.handleEdSize}
            size={this.state.edSize}
            clearAll={this.clearAll}
          />
          <Editor handleChange={this.handleChange} value={this.state.value} />
        </section>
        <section>
          <Block
            heading="Preview"
            handleSize={this.handlePrSize}
            size={this.state.prSize}
            handleSelect={this.handleSelect}
            select={this.state.select}
          />
          <Preview
            preview={this.state.preview}
            select={this.state.select}
            value={this.state.value}
          />
        </section>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
