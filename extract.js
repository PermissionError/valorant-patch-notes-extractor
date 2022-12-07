import { extract } from '@extractus/article-extractor';
import CN from 'chinese-conv';
import fs from 'fs';

let simplified = await extract(process.argv.slice(2)[0]);

let content = simplified.content;
content = content.replaceAll('<span>', '');
content = content.replaceAll('<\/span>', '');
content = content.replaceAll('<strong>', '[b]');
content = content.replaceAll('<\/strong>', '[/b]');
content = content.replaceAll('<em>', '');
content = content.replaceAll('<\/em>', '');
content = content.replaceAll('<p>', '[quote]');
content = content.replaceAll('<\/p>', '[/quote]');
content = content.replaceAll('<h3>', '[b]');
content = content.replaceAll('<\/h3>', '[/b][h][/h]');
content = content.replaceAll('<h4>', '[b]');
content = content.replaceAll('<\/h4>', '[/b][h][/h]');
content = content.replaceAll('<h2>', '[h]');
content = content.replaceAll('<\/h2>', '[/h]');
content = content.replaceAll('<ul>', '\n[list]');
content = content.replaceAll('<\/ul>', '[/list]');
content = content.replaceAll('<li>', '[*]');
content = content.replaceAll('<\/li>', '\n');
content = content.replaceAll('<table>', '[table]');
content = content.replaceAll('<\/table>', '[/table]');
content = content.replaceAll('<tbody>', '');
content = content.replaceAll('<\/tbody>', '');
content = content.replaceAll('<tr>', '[tr]');
content = content.replaceAll('<\/tr>', '[/tr]');
content = content.replaceAll('<td>', '[td]');
content = content.replaceAll('<\/td>', '[/td]');
content = content.replaceAll('<div>', '');
content = content.replaceAll('<\/div>', '');

content = CN.sify(content);

fs.unlink('extracted.txt', () => {});
fs.writeFile('extracted.txt', content, {encoding: 'utf-8'}, () => {});