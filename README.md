# NgBlog - Angular Blogging App
> A single user daily blogging app in Angular


### Live Demos

* [Harry's Blog](https://blog.realharry.com/): I'm using `NgBlog` for my personal blog (a la "dogfood'ing"). This site is currently hosted on Netlify.
* [NgBlog Demo Blog](https://ngblog.gitlab.io/ngblog/): The code snapshot is being deployed via GitLab CI/CD. (Due to the limitations of GitLab Pages, however, the demo app is not fully functional. In particular, you'll run into many broken links.)


## What is NgBlog?

`NgBlog` is a blogging app of the developers, by the developers, and for the developers.

1. `NgBlog` is not a hosted blogging platform.
1. `NgBlog` is a single user - single author blogging app.
1. `NgBlog` does not include the "author's user interface".
1. `NgBlog` needs to be deployed by the author/developer.
1. Creating a new post may require a new deployment of the app.

Despite these (severe) limitations and lack of features, `NgBlog` provides other advantanges.

* Ease of deployment: `NgBlog` is a frontend-only "static site" blogging app. There is no need to set up, and maintain, a backend server. There are no complicated steps for setting up or migrating database tables and what not. You just deploy/upload it to any platform where static web pages can be hosted.
* Flexibility: `NgBlog` is open-source software with rather open-ended design. You can do just about anything if you are a developer. The code is already "PWA-enabled" and "SSR-enabled" (not fully tested at this point), among other things.
* Data portablility. In `NgBlog`, a post is a simple markdown file (with JSON metadata). You can easily "export" or migrate your posts to different apps.


It's really a trade-off. If you want a hosted service with a nice user interface, use Tumblr. Or, use a CMS platform like WordPress. Or, use any of the hundreds of blogging apps out there.
If you are a developer and want full control over your daily blogging, however, then `NgBlog` cab be a great app.
`NgBlog` is developed in 
[Angular](https://gitlab.com/angulartutor) with 
[Angular Material](https://gitlab.com/angularmaterial/setup),
and it can provide certain advantages over other static website generators, especially if you are an Angular developer.

_Note: Since it's really frontend only, it's not really SEO-friendly. If you want SEO, you may consider using SSR-enabled server-version of the app (aka "Angular Universal"). But, again, it's a tradeoff. Doing so will add a complexity (e.g., in terms of deployment, etc.). It should be noted, as of this writing, SSR has not been tested._


## How to Use `NgBlog`

### (1) Clone the repo

Clone or fork this repo: [NgBlog/ngblog](https://gitlab.com/ngblog/ngblog).


### (2) Add app config file

Copy `configs/app-config.dev.json` and name it `app-config.json`.
Modify the config values as you see fit.
For example, set `"blog-post-folder"` to "/posts"
(and, create a such-named folder under "/src").

Note that blog posts can be hosted on a remote server (that can be accessed via HTTP). For example, you can use Amazon S3. 
Just specify in the config the absolute URL to the folder (or, S3 bucket, etc.) for blog posts.

_1. The dev config values are for demo purposes only, and they may not reflect a typical production setup. 2. Config file is publicly accessible. Do not put any sensitive information._


### (3) Create a post

Add a folder under the `/posts` directory.
The folder should be named after today's date, in the format "yyyymmdd",
where the months run from 1 to 12. 
That is, January is "01" and December is "12".
(The current limitation is that you can create only one post per day.
This should be easy to change though if you have some basic knowledge of Typescript.)

Add the following three files under today's folder:

* `post.json`: Metadata file.
* `summary.md`: Summary of the post. Will be displayed in the "listing" page.
* `content.md`: The post. This is optional. You can put all your content in `summary.md` instead.

Refer to the sample folder `posts-dev/20171225` for an example.
You can also add any image files in the dated post folder
and refer to them with relative URLs.
To cite other posts in the blog,
you can use absolute urls [using permalinks](https://blog.realharry.com/week/20180106).
Or, you can use relative urls in the form of "post/yyyymmdd".
Alternatively, you can also [use hash link redirect](https://blog.realharry.com/post/20180117) (e.g., "#post/yyyymmdd") to avoid full page refresh.

Note that we currently support markdown only (simply because I use markdown),
but it'll be rather easy to add support for simple text format or HTML content format.


### (4) Build

    npm i
    ng build --prod

_(Note: if you use a remote hosting for posts/contents (like S3), rebuiling/redeployment is not necessary.)_


### (5) Deploy

Deploy the `dist` folder to your hosting service. Any service that supports static websites will do,
including S3 or any other static site hosting services.
As stated, you can either deploy both the code and the blog content to a single website, 
or you can deploy them to two separate sites.

Note that in order to use PWA features, your ngblog app should be served under `https`. (It may require some additional tweaking as well.)


### (6) "Maintenance"

#### How to update the theme

The material theme is defined in `custom-theme.scss`.
Update the SCSS variables as you see fit.
Or, you can just [use one of the 4 prebuilt themes of Angular Material](https://gitlab.com/angularmaterial/setup#stylecss).


#### How to add sitemaps

There is no easy way to add a dynamic client-side sitemap
in a SPA app like Angular (with client-side only deployment).
You can create a sitemap from the sitemaps page (accessible via `<your host url>/admin?v=<admin token>`)
and manually update `sitemap.xml` in the app src root directory.
(Requires re-deployment.)



## Contribute

If you find this app useful, and start making your own modifications,
please consider contributing back.
Pull requests are greatly appreciated.



