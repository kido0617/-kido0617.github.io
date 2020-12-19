const {stripHTML, escapeHTML } = require('hexo-util');

hexo.extend.helper.register('isDevelopment', function(){
  return this.env.cmd == 'server';
});

hexo.extend.helper.register('get_description', function(){
  let description =  this.page.description || this.page.excerpt || this.page.content || this.config.description;
  description = escapeHTML(stripHTML(description).substring(0, 200)
    .trim()
  ).replace(/\n/g, ' ');
  if(this.is_archive()) description += this.page.year + "年の記事一覧です。";
  else if(this.is_category()) description += this.page.category + "カテゴリの記事一覧です。";
  return description;
});

