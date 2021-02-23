const fs = require('fs/promises');

const hljs = require('highlight.js');

var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      console.log(lang)
      try {
        return `<pre class="hljs"><code language=${lang}>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) { }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

fs.readFile('C:\\Users\\0x146 1A0\\Desktop\\二叉搜索树.md', { encoding: 'utf-8' })
  .then(res => {
    var result = md.render(res);
    // const highlightedCode = hljs.highlightAuto(result).value
    fs.writeFile('C:\\Users\\0x146 1A0\\Desktop\\index.html', result)
  })

