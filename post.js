'use strict';

var showdown = require('showdown'),
  converter = new showdown.Converter({ tables: true });

class Post {
  constructor(title, date, filename, rawContent) {
    this.title = title;
    this.date = date;
    this.filename = filename;
    this.rawContent = rawContent;
    this.content = null;
  }

  getTitle() {
    return this.title;
  }

  getDate() {
    return this.date;
  }

  getFileName() {
    return this.filename.replace(/.md/, '.html');
  }

  getContent() {
    if (this.content != null) {
      return this.content;
    }

    // yeah this is ugly but works so I guess it's ok for now
    var part = this.rawContent.split('$$');
    var ret = '';

    for (var i = 0; i < part.length; i++) {
      ret += (i % 2 == 0) ?
        converter.makeHtml(part[i]) :
        '$$' + part[i] + '$$';
    }

    this.content = ret;
    return ret;
  }

  getSummary() {
    var content = this.content == null ?
      this.getContent() :
      this.content;

    return (content.length > 400 ?
      content.slice(0, 400) :
      content[content.length]) + '...';
  }
}

module.exports = Post;

