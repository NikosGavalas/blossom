module.exports = {
	// meta tags, seo
	"meta": {
		"description": "My personal blog",
		"author": "John Doe",
		"keywords": "Personal, Blog"
	},

	// title, favicon
	"site": {
		"title": "John's site",
		"favicon": "favicon.png"
	},
	
	// navbar settings
	"navbar": {
		"brand": "John Doe",
		"theme" : "dark", // light or dark
		"background_color": "" // leave empty for defaults
	},
	
	// home settings
	"home": {
		"avatar": {
			'source': "avatar.png", // leave empty for gravatar lookup (requires email below)
			'size': 100,
			'circle': true
		},

		"name": "John Doe",

		"bio": `Welcome. This is my site bla bla bla. Sample text Sample text Sample text Sample text.`,
		"info": `I can include custom html here like links. For example you can visit my blog <a href="/blog">here</a>.`,
		"interests": `I am a big fun of whatever.`,
	},

	// social: leave empty the fields you don't want to display
	"social": {
		"email": "my@mail.com",
		"facebook": "myfb",
		"linkedin": "https://www.linkedin.com/in/nikosgavalas/",
		"twitter": "www.twitter.com/mytwitterlinkhere",
		"instagram": "johndoe's boring pictures",
		"github": "",
		"gitea": "https://code.nickgavalas.com/nik",
		"gpg": "", 
		"bitcoin": "mybitcoin address?",
		"google-plus": "",
		"stackoverflow": "",
		"skype": "",
		"youtube": ""
	},
	
	// blog home settings
	"blog": {
		"heading": "John Doe's blog",
		"message": "Welcome to my blog.",
		"content_preview": false
	},

	// other pages (not yet implemented)
	"other_pages": {
		// "About": "filename_with_content.md"
	}
}
