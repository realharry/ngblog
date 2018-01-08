## To Do list

Config: Done

Pagination: Done

Support remote files/posts (e.g., S3): Works as is

PWA: Partially done
    (Local contents are cached. Need to support remote content files/URLs.)

SSR: Added support via Angular CLI (Not tested yet)

Image file support (for Markdown post): Partially done. 2017/01/04
    Image files can be included in the "Posts" (local or remote) folder.
    Absolute URLs can be used.

Sitemap: Partially done. 2017/01/05
    (Manual client-side sitemap generator has been added.)
    (Dynamic sitemap generation requires server-side support.)

Permalink: Done. 2017/01/06
    Now dateId post URLs are redirected to permalink URLs.

Social sharing: Done. 2017/01/07
    Supports Share on Twitter/Facebook/LinkedIn, and via email.

Basic admin/author interface: Partially done. 2017/01/07
    Added an admin screen, which is accesible with "admin visitor token".


Client-side search

Tag/label support

Support custom UI (other than Accordion listing)?


Weekly summary page
Monthly summary page


Support more than one posts per day
--> Well, actually, we will probably limit one post per day, 
    but support more than one content files per post. TBD.


Better pagination: Currently, the metadta (post.json) of all posts are loaded/fetched regardless of pagination.

Better sitemap: (Server-based) dynamic generation of sitemap.

"Pinned" posts & main dashboard/gallery page?
And/or "blog rolls"?
(Client-side) bookmarks?

Use auth (and remove visitor token service).

Add commenting system?

"Post module" lazy loading

Image file server? To host user's image files?


Post generator (e.g., UI for generating a set of files in a post-date folder)

And, in general, "admin" interface?
Or, even a separate admin app?


Better content management:
Currently, posts are essentially "file system"-based 
  (even when they are served from remote content server/static web server).
This is a mixed blessing. It provides the ultimate flexibility.
But a downside is that it lacks "permanancy".
The post folders can be moved/renamed or deleted, etc.,
which has negative implications for "permalinks", etc.
(For example, when a post folder is moved/deleted, the reader with the permalink to that post
will get 404 instead of a more friendly post moved/deleted message.)


