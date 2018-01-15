## To Do list

Config: Done

Pagination: Done

Support remote files/posts (e.g., S3): Works as is

PWA: Partially done
    (Local contents are cached. Need to support remote content files/URLs.)

SSR: Added support via Angular CLI (Not tested yet)

Image file support (for Markdown post): Partially done. 2018/01/04
    Image files can be included in the "Posts" (local or remote) folder.
    Absolute URLs can be used.

Sitemap: Partially done. 2018/01/05
    (Manual client-side sitemap generator has been added.)
    (Dynamic sitemap generation requires server-side support.)

Permalink: Done. 2018/01/06
    Now dateId post URLs are redirected to permalink URLs.

Social sharing: Done. 2018/01/07
    Supports Share on Twitter/Facebook/LinkedIn, and via email.

Basic admin/author interface: Partially done. 2018/01/07
    Added an admin screen, which is accesible with "admin visitor token".

Weekly/Monthly digest page: Done. 2018/01/09

Feature module lazy loading: Partially done. 2018/01/12
    Serious bug with AppConfig DI.
    Lazy-loading actually deteriorated the performance.

AppConfig DI bug
(AppConfig instance is not shared in lazy-loaded modules.)
--> Fixed (Added a workaround) by adding an AppConfig wrapper service.

Integrate Disqus: Done. 2018/01/14
     Need more testing.


Accordion UI bug
(Index/step is currently used as "state" rather than the post id/date.)



"Convert" markdown links/urls into Angular nav links
How ???


Client-side search

Tag/label support

"Related" posts?


RSS feed ?


Prev/Next navigation from the post/permalink page

Support custom UI (other than Accordion listing)?


Support more than one posts per day
--> Well, actually, we will probably limit one post per day, 
    but support more than one content files per post. TBD.


Content/post database ???


Better pagination: Currently, the metadta (post.json) of all posts are loaded/fetched regardless of pagination.

Better sitemap: (Server-based) dynamic generation of sitemap.

"Pinned" posts & main dashboard/gallery page?
   Author pinning vs reader pinning (bookmarking) ???
And/or "blog rolls"?
(Client-side) bookmarks?

Use auth (and remove visitor token service).

Better commenting system?
Allow disabling comment per post?

"Post module" lazy loading

Image file server? To host user's image files?


Post generator (e.g., UI for generating a set of files in a post-date folder)

And, in general, "admin" interface?
Or, even a separate admin app?


Chrome extension?

Native apps?



Better content management:
Currently, posts are essentially "file system"-based 
  (even when they are served from remote content server/static web server).
This is a mixed blessing. It provides the ultimate flexibility.
But a downside is that it lacks "permanancy".
The post folders can be moved/renamed or deleted, etc.,
which has negative implications for "permalinks", etc.
(For example, when a post folder is moved/deleted, the reader with the permalink to that post
will get 404 instead of a more friendly post moved/deleted message.)



Multiple blog support?
   server/author side
   vs. client/reader side

