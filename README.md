# NgBlog
> A single user blogging app in Angular

`NgBlog` is a blogging app of the developers, by the developers, for the developers.

1. `NgBlog` is not a hosted blogging platform.
1. `NgBlog` is a single user - single author blogging app.
1. `NgBlog` does not include the "author's user interface".
1. `NgBlog` needs to be deployed by the author/developer.
1. Creating a new post requires a new deployment of the app.

Despite these (severe) limitations and lack of eatures, `NgBlog` provides other advantanges.

* Ease of deployment: `NgBlog` is a frontend-only blogging app. There is no need to set up, and maintain, a backend server. There are no complicated steps for setting up database tables and what not. You just deploy/upload it to any platform where static web pages can be hosted.
* Flexibility: `NgBlog` is open-source. You can do just about anything, if you are developer.
* Data portablility. In `NgBlog`, a post is a simple markdown file (with JSON metadata). You can easily "export" or migrate your posts to different apps.


It's really a trade-off. If you want a hosted service with a nice user interface, use Tumblr. Or, use a CMS platofrm like WordPress. Or, use any of the hundreds of blogging apps out there.
If you are a developer and want full control over your daily blogging, however, then `NgBlog` cab be a great app.
`NgBlog` is developed in 
[Angular](https://gitlab.com/angulartutor) with 
[Angular Material](https://gitlab.com/angularmaterial/setup),
and it can provide certain advantages over other static website generators, especially if you are an Angular developer.

_Note: Since it's really frontend only, it's not really SEO-friendly. If you want SEO, you may consider adding SSR. But, again, it's a tradeoff. Doing so will add a complexity to the app (e.g., in terms of deployment, etc.)._


## How to Use `NgBlog`

### Clone the repo

Clone or fork this repo: [NgBlog/ngblog](https://gitlab.com/ngblog/ngblog).


### Create a post

Add a folder under the `/posts` directory.
The folder should be named after today's date, in the format "yyyymmdd",
where the months run from 1 to 12. 
That is, January is "01" and December is "12".
(The current limitation is that you can create only one post per day.
This is easy to change though if you have some basic knowlege of Typscript.)

Add the following three files under today's folder:

* `post.json`: Metadata file.
* `summary.md`: Summary of the post. Will be displayed in the "listing" page.
* `content.md`: The post. This is optional. You can put all your content in `summary.md` instead.

Refer to the sample folder `20171225` for an example.
You may want to delete this folder once you start posting your own blog.

Note that we currently support markdown only (simply because I use markdown),
but it is very easy to add support for simple text format or HTML content format.



### Build

    npm i
    ng build


### Deploy

Deploy the `dist` folder to your hosting service. Any service that supports static websites will do,
including S3 or GitLab Pages, etc.



## Contribute

If you find this app useful, and start adding your own modifications,
please consider contributing back.

In general, I would personally prefer that any (big) new features that could increase the complexity
should be made optional so that we don't need to go through 12 steps just to deploy a basic version of the app.

Pull requests are greatly appreciated.



