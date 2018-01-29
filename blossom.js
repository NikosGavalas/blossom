'use stict';

var fs = require('fs');

var jquery = require('jquery');
const { JSDOM } = require("jsdom");
var JSDOM_options = { contentType: "text/html" };

var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var Post = require('./post');

var comm = require('commander');
comm
	.version('0.1.0')
	.option('-o, --output <item>', 'output directory')
	.option('-i, --input <item>', 'input directory')
	.option('-c, --config <item>', 'config.js file location')
	.parse(process.argv);

var OUTDIR = comm.output || 'blog';
var INDIR = comm.input || 'sample_content';
var config = comm.config || './config';
const CONFIG = require(config);


/* Create an array of all the posts */
var posts = [];

/* Populate it */
if (!fs.existsSync(INDIR)) {
	console.log('Please create a directory "content" with your markdown files first, or point to an existing one using the "-i" option');
	process.exit(1);
}

function createDir(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

createDir(OUTDIR);

fs.readdirSync(INDIR, 'utf8').forEach(filename => {
	var isMd = /^.+\.md$/;

	if (isMd.test(filename)) {
		var tokens = filename.replace(/_/g, ' ').replace(/.md/, '').split('-');

		posts.push(new Post(tokens[0], tokens[1], filename,
			fs.readFileSync(INDIR + '/' + filename, 'utf8')));
	}
});

/* Sort them based on date */
posts.sort((a, b) => { return (a.getDate() >= b.getDate() ? -1 : 1) });

function backgroundColor() {
	let col = CONFIG.navbar.background_color;

	return col == '' ||
		col == ' ' ?
		'bg-' + CONFIG.navbar.theme : '" style="background-color: ' + col + '; "';
}

var base = fs.readFileSync('base.html', 'utf8');
base = base.replace(/@{description}/g, CONFIG.meta.description)
	.replace(/@{author}/g, CONFIG.meta.author)
	.replace(/@{keywords}/, CONFIG.meta.keywords)
	.replace(/@{title}/, CONFIG.site.title)
	.replace(/@{favicon}/, CONFIG.site.favicon)
	.replace(/@{brand}/, CONFIG.navbar.brand)
	.replace(/@{theme}/g, CONFIG.navbar.theme)
	.replace(/@{background-color}/, backgroundColor());


createDir(OUTDIR + '/content');

function loadImage(imageFileName) {
	var src = INDIR + '/' + imageFileName;
	var dst = OUTDIR + '/content/' + imageFileName;

	if (!fs.existsSync(dst))
		fs.copyFileSync(src, dst);
}

loadImage(CONFIG.site.favicon);

function generateBlogHomeHTML(posts) {
	const dom = new JSDOM(base, JSDOM_options);
	var $ = jquery(dom.window);

	var archiveList = $('<ul>').attr('id', 'archiveList');

	posts.forEach(post => {
		var list = $('<li>').append(
			$('<a>').attr('href', 'content/' + post.getFileName()).text(post.getTitle())
		).append(
			' - ' + post.getDate()
		)

		if (CONFIG.blog.content_preview) {
			list.append(
				$('<p>').addClass('text-muted').text(
					$(post.getSummary()).text()
				)
			)
		}

		archiveList.append(list);
		
	});

	var latestPost = $('<ul>').append(archiveList.children().first().clone());

	$('#main').append($('<h3>').text(CONFIG.blog.heading))
		.append($('<p>').text(CONFIG.blog.message))
		.append('<hr>')
		.append($('<h4>').text('Latest Post'))
		.append('<hr>')
		.append(latestPost)
		.append($('<h4>').text('Archive'))
		.append('<hr>')
		.append(archiveList);

	fs.writeFileSync(OUTDIR + '/blog.html', dom.serialize());

	return;
}

generateBlogHomeHTML(posts);

function addSocialIcon($, icon, value) {
	$('#social-list').append(
		$('<li>').addClass('list-inline-item').append(
			$('<a>').addClass('social fa fa-' + icon).attr('href', value)
		)
	)
	return;
}

function calculateGravatarHash(email) {
	email = email.replace(/ /g, '').toLowerCase();

	var ret = md5.update(email).digest('hex').toString();
	return ret;
}

function getAvatar() {

	if (CONFIG.home.avatar.source != "") {
		loadImage(CONFIG.home.avatar.source);
	}

	return CONFIG.home.avatar.source == "" ?
		'https://www.gravatar.com/avatar/' + calculateGravatarHash(CONFIG.social.email) + '?s=290' :
		'./content/' + CONFIG.home.avatar.source;
}

function generateIndexHTML() {
	const dom = new JSDOM(base, JSDOM_options);
	var $ = jquery(dom.window);

	$('#main').append(
		$('<img>').attr({
			'class': CONFIG.home.avatar.circle ? 'rounded-circle' : 'rounded',
			'src': getAvatar(),
			'alt': 'avatar',
			'width': CONFIG.home.avatar.size,
			'height': CONFIG.home.avatar.size
		})
	).append(
		$('<div>').addClass('col-md-10 offset-md-1').attr('id', 'info').append(
				$('<h1>').addClass('text-center').text(CONFIG.home.name)
			).append(
				$('<h5>').html(CONFIG.home.bio)
			).append(
				$('<h5>').html(CONFIG.home.info)
			).append(
				$('<h5>').html(CONFIG.home.interests)
			)	
	);

	var countNonEmpty = 0;
	for (var key in CONFIG.social) {
		if (CONFIG.social[key] != "") 
			countNonEmpty++;
	}

	if (countNonEmpty != 0) {
		$('#info').append(
			$('<h5>').text('Connect:')
		).append(
			$('<ul>').attr('id', 'social-list').addClass('list-inline')
		)

		for (var key in CONFIG.social) {
			var current = CONFIG.social[key];

			if (current != "") {
				switch (key) {
					case 'email':
						addSocialIcon($, 'envelope', 'mailto: ' + current);
						break;
					case 'instagram':
						addSocialIcon($, 'instagram', current);
						break;
					case 'linkedin':
						addSocialIcon($, 'linkedin', current);
						break;
					case 'github':
						addSocialIcon($, 'github', current);
						break;
					case 'twitter':
						addSocialIcon($, 'twitter', current);
						break;
					case 'facebook':
						addSocialIcon($, 'facebook', current);
						break;
					case 'gitea':
						addSocialIcon($, 'code-fork', current);
						break;
					case 'gpg':
						addSocialIcon($, 'key', current);
						break;
					case 'bitcoin':
						addSocialIcon($, 'bitcoin', current);
						break;
					case 'google-plus':
						addSocialIcon($, 'google-plus', current);
						break;
					case 'stackoverflow':
						addSocialIcon($, 'stack-overflow', current);
						break;
					case 'skype':
						addSocialIcon($, 'skype', current);
						break;
					case 'youtube':
						addSocialIcon($, 'youtube', current);
						break;
					default:
						break;
				}
			}
		}		
	}

	fs.writeFileSync(OUTDIR + '/index.html', dom.serialize());
}

generateIndexHTML();

createDir(OUTDIR + '/content');

function generateContentHTML(post) {
	const dom = new JSDOM(base, JSDOM_options);
	var $ = jquery(dom.window);

	// to my future self: the line below is causing the favicon bug you seek.
	$('#favicon').attr('href', './' + CONFIG.site.favicon)

	$('#main').append($('<p>').addClass('post-date')
		.append(post.getDate()))
		.append(post.getContent());

	$('img').each((index, element) => {
		var neededImg = $(element).attr('src');
		loadImage(neededImg);
	});

	return dom.serialize();
}

posts.forEach(post => {
	fs.writeFileSync(OUTDIR + '/content/' + post.getFileName(),
		generateContentHTML(post), 'utf8');
});
